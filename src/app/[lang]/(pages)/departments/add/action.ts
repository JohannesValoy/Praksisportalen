"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

/**
 * The fetchDepartments function fetches all departments from the database.
 * @returns A list of departments.
 */
export async function fetchDepartments() {
  return await DBclient("departments").select("name", "employeeID");
}

/**
 * The fetchEmployees function fetches all employees from the database.
 * @returns A list of employees.
 */
export async function fetchEmployees() {
  return await DBclient("employees").select("name", "id", "email");
}

/**
 * The createDepartment function adds a new department to the database.
 * @param data The department object to be added.
 */
export async function createDepartment(data) {
  await DBclient("departments").insert({
    name: data.name,
    employeeID: data.employeeID,
  });
}
