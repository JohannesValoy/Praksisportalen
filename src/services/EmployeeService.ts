/** @format */
"use server";
import { Employee, EmployeePaginationRequest } from "@/app/_models/Employee";
import DBclient from "@/knex/config/DBClient";
import { EmployeeTable } from "knex/types/tables.js";
import { encryptPassword } from "@/lib/auth";
import { PageResponse } from "@/app/_models/pageinition";
import { randomUUID } from "crypto";

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
  if (!employee.id) {
    employee.id = randomUUID();
  }
  employee.password = await encryptPassword(employee.password);
  await DBclient.insert(employee).into("employees");
}

async function createEmployees(employee: EmployeeTable[]) {
  const missingUUID = employee.filter((employee) => !employee.id);
  missingUUID.forEach((employee) => {
    employee.id = randomUUID();
  });
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
  request: EmployeePaginationRequest
): Promise<PageResponse<Employee>> {
  const query = await DBclient.select()
    .from<EmployeeTable>("employees")
    .where((builder) => {
      if (request.containsName) {
        builder.where("name", "like", request.containsName);
      }
      if (request.containsEmail) {
        builder.where("email", "like", request.containsEmail);
      }
      if (request.hasRole) {
        builder.whereIn("role", request.hasRole);
      }
    })
    .orderBy(request.sort || "name");
  const employees: Employee[] = [];
  const offset = request.page * request.size;
  query.slice(offset, request.size + offset).forEach((employee) => {
    employees.push({ ...employee });
  });
  return {
    ...request,
    elements: employees,
    totalElements: query.length,
    totalPages: Math.ceil(query.length / request.size),
  };
}

async function deleteEmployee(id: number) {
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
