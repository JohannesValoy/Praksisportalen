"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

export async function fetchDepartments() {
  const response = await DBclient("departments").select("*");

  return response.map((department) => {
    return {
      name: department.name,
      id: department.id,
    };
  }, {});
}

export async function fetchSections() {
  const response = await DBclient("sections").select("*");

  return response.map((section) => {
    return {
      name: section.name,
    };
  }, {});
}

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

export async function createSectionType(data) {
  await DBclient("sectionTypes").insert({
    name: data.name,
  });
  return null;
}

export async function createSection(data) {
  await DBclient("sections").insert({
    name: data.name,
    employeeID: data.employeeID,
    departmentID: data.departmentID,
  });
  return null;
}
