/** @format */

import {
  EmployeeObject,
  EmployeePaginationRequest,
} from "@/app/_models/Employee";
import DBclient from "@/knex/config/DBClient";
import { EmployeeTable } from "knex/types/tables.js";
import { encodeID, encryptPassword } from "@/lib/auth";
import { PageResponse } from "@/app/_models/pageinition";
import { randomUUID } from "crypto";

async function getEmployeeObjectByID(id: string): Promise<EmployeeObject> {
  const employee = await getEmployeeObjectByIDList([id]);
  if (employee.get(id) == undefined) {
    throw new Error("Employee not found ;-(");
  }
  return employee.get(id);
}

async function getEmployeeObjectByIDList(
  idList: string[]
): Promise<Map<string, EmployeeObject>> {
  const query = await DBclient.select()
    .from<EmployeeTable>("employees")
    .whereIn("id", idList);
  const employees: Map<string, EmployeeObject> = new Map();
  query.forEach((employee) => {
    employees.set(employee.id, new EmployeeObject(employee));
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
  for (const emp of employee) {
    await createEmployee(emp);
  }
}

async function getEmployeeObjectsByPagination(
  request: EmployeePaginationRequest
): Promise<PageResponse<EmployeeObject>> {
  const query = await DBclient.select()
    .from<EmployeeTable>("employees")
    .where((builder) => {
      if (request.name) {
        builder.where("name", "like", `%${request.name}%`);
      }
      if (request.email) {
        builder.where("email", "like", `%${request.email}%`);
      }
      if (request.role) {
        builder.where("role", "like", `%${request.role}%`);
      }
    })
    .orderBy(request.sort);
  const employees: EmployeeObject[] = [];
  const offset = request.page * request.size;
  query.slice(offset, request.size + offset).forEach((employee) => {
    employees.push(new EmployeeObject(employee));
  });
  return new PageResponse(request, employees, employees.length);
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
