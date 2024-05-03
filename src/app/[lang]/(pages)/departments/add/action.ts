"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

/**
 * The fetchDepartments function fetches all departments from the database.
 * @returns A list of departments.
 */
export async function fetchDepartments() {
  const response = await DBclient("departments").select("*");

  return response.map((department) => {
    return {
      name: department.name,
      employeeID: department.employeeID,
    };
  }, {});
}

/**
 * The fetchEmployees function fetches all employees from the database.
 * @returns A list of employees.
 */
export async function fetchEmployees() {
  const response = await DBclient("employees").select("*");

  return response.map((employee) => {
    return {
      name: employee.name,
      id: employee.id,
      email: employee.email,
    };
  }, {});
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
