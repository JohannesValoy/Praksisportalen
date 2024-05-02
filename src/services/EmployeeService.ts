"use server";
import { Employee, EmployeePaginationRequest } from "@/app/_models/Employee";
import DBclient from "@/knex/config/DBClient";
import { EmployeeTable } from "knex/types/tables.js";
import { encryptPassword } from "@/lib/auth";
import { PageResponse } from "@/app/_models/pageinition";

/**
 * Gets an {@link Employee} object by its id.
 * @param id The id of the {@link Employee}.
 * @returns The {@link Employee} object.
 * @throws An angry error if no {@link Employee} is found with the given id.
 */
async function getEmployeeObjectByID(id: string): Promise<Employee> {
  const employee = await getEmployeeObjectByIDList([id]);
  if (employee.get(id) == undefined) {
    throw new Error("Employee not found ;-(");
  }
  return employee.get(id);
}

/**
 * Gets a list of {@link Employee} objects by their ids.
 * @param idList A list of ids to fetch.
 * @returns A map of {@link Employee} objects with the id as key.
 */
async function getEmployeeObjectByIDList(
  idList: string[],
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

/**
 * Creates an {@link Employee} object.
 * @param employee The {@link Employee} object to create.
 */
async function createEmployee(employee: EmployeeTable) {
  await createEmployees([employee]);
}

/**
 * Creates employees in the database by hashing their passwords and inserting them.
 * @param employee a list of {@link EmployeeTable} employees to insert
 */
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

/**
 * Fetches a page of employees based on the page request
 * @param pageRequest A {@link EmployeePaginationRequest}
 * @returns a {@link PageResponse} of {@link Employee}
 */
async function getEmployeeObjectsByPagination(
  pageRequest: EmployeePaginationRequest,
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
        : "id",
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
/**
 * Deletes an employee by its id
 * @param id the id of the employee
 * @returns the number of employees deleted
 */
async function deleteEmployee(id: string) {
  //TODO: Why return a number? Shouldn't it be a boolean or throw a error if it can't delete? There is never gonna be a case where it returns more then 1
  return await DBclient.delete().from("employees").where("id", id);
}

async function generatePassword(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export {
  getEmployeeObjectByID,
  getEmployeeObjectByIDList,
  createEmployee,
  createEmployees,
  getEmployeeObjectsByPagination,
  deleteEmployee,
  generatePassword,
};
