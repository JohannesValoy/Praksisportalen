/** @format */
"use server";
import { Employee, EmployeePaginationRequest } from "@/app/_models/Employee";
import DBclient from "@/knex/config/DBClient";
import { EmployeeTable } from "knex/types/tables.js";
import { encryptPassword } from "@/lib/auth";
import { PageResponse } from "@/app/_models/pageinition";

async function getEmployeeObjectByID(id: string): Promise<Employee> {
  const employee = await getEmployeeObjectByIDList([id]);
  if (employee.get(id) == undefined) {
    throw new Error("Employee not found ;-(");
  }
  return employee.get(id);
}

async function getEmployeeObjectByIDList(
  idList: string[]
): Promise<Map<string, Employee>> {
  const query = await DBclient.select()
    .from<EmployeeTable>("employees")
    .whereIn("id", idList);
  const employees: Map<string, Employee> = new Map();
  query.forEach((employee) => {
    employees.set(employee.id, {
      ...employee,
    });
  });
  return employees;
}

async function createEmployee(employee: EmployeeTable) {
  await createEmployees([employee]);
}

async function createEmployees(employee: EmployeeTable[]) {
  const encryptions: Promise<void>[] = [];
  employee.forEach((employee) => {
    const promise = async () => {
      employee.password = await encryptPassword(employee.password);
    };
    encryptions.push(promise());
  });
  await Promise.all(encryptions);
  await DBclient.insert(employee).into("employees");
}

async function getEmployeeObjectsByPagination(
  pageRequest: EmployeePaginationRequest
): Promise<PageResponse<Employee>> {
  const query = await DBclient.select()
    .from<EmployeeTable>("employees")
    .where((builder) => {
      if (pageRequest.containsName) {
        builder.where("name", "like", pageRequest.containsName);
      }
      if (pageRequest.containsEmail) {
        builder.where("email", "like", pageRequest.containsEmail);
      }
      if (pageRequest.hasRole) {
        builder.whereIn("role", pageRequest.hasRole);
      }
    })
    .orderBy(
      ["id", "name", "email"].includes(pageRequest.sort)
        ? pageRequest.sort
        : "id"
    );
  const employees: Employee[] = [];
  const offset = pageRequest.page * pageRequest.size;
  query.slice(offset, pageRequest.size + offset).forEach((employee) => {
    employees.push({ ...employee });
  });
  return {
    ...pageRequest,
    elements: employees,
    totalElements: query.length,
    totalPages: Math.ceil(query.length / pageRequest.size),
  };
}

async function deleteEmployee(id: string) {
  return await DBclient.delete().from("employees").where("id", id);
}

export {
  getEmployeeObjectByID,
  getEmployeeObjectByIDList,
  createEmployee,
  createEmployees,
  getEmployeeObjectsByPagination,
  deleteEmployee,
};
