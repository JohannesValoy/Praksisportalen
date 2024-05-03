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
      id: department.id,
    };
  }, {});
}

/**
 * The fetchEmployees function fetches all employees from the database.
 * @returns A list of employees.
 */
export async function fetchSections() {
  const response = await DBclient("sections").select("*");

  return response.map((section) => {
    return {
      name: section.name,
    };
  }, {});
}

/**
 * The createDepartment function adds a new department to the database.
 * @param data The department object to be added.
 */
export async function fetchSectionTypes() {
  const response = await DBclient("sectionTypes").select("*");

  return response.map((sectionType) => {
    return {
      name: sectionType.name,
    };
  }, {});
}

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
