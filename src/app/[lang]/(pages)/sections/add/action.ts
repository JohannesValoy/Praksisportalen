"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

/**
 * The fetchDepartments function fetches all departments from the database.
 * @returns A list of departments.
 */
export async function fetchDepartments() {
  return await DBclient("departments").select("name", "id");
}

/**
 * The fetchEmployees function fetches all employees from the database.
 * @returns A list of employees.
 */
export async function fetchSections() {
  return await DBclient("sections").select("name");
}

/**
 * The createDepartment function adds a new department to the database.
 * @param data The department object to be added.
 */
export async function fetchSectionTypes() {
  return await DBclient("sectionTypes").select("name");
}

export async function fetchEmployees() {
  return await DBclient("employees").select("name", "id", "email");
}

/**
 * The createDepartment function adds a new department to the database.
 * @param data The department object to be added.
 */
export async function createSectionType(data) {
  await DBclient("sectionTypes").insert({
    name: data.name,
  });
}

/**
 * The createDepartment function adds a new department to the database.
 * @param data The department object to be added.
 */
export async function createSection(data) {
  await DBclient("sections").insert({
    name: data.name,
    employeeID: data.employeeID,
    departmentID: data.departmentID,
    sectionType: data.sectionType,
  });
}
