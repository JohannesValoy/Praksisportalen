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
 * the fetchSections function fetches all sections names from the database.
 * @returns A list of sections.
 */
export async function fetchSectionNames() {
  return await DBclient("sections").select("name");
}

/**
 * The fetchSectionTypes function fetches all section types from the database.
 * @returns A list of section types.
 */
export async function fetchSectionTypes() {
  return await DBclient("sectionTypes").select("name");
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
export async function createSectionType(data) {
  await DBclient("sectionTypes").insert({
    name: data.name,
  });
}

/**
 * The createSection function adds a new section to the database.
 * @param data The section object to be added.
 */
export async function createSection(data) {
  await DBclient("sections").insert({
    name: data.name,
    employeeID: data.employeeID,
    departmentID: data.departmentID,
    sectionType: data.sectionType,
  });
}
