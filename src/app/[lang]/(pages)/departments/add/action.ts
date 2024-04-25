"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

export async function fetchDepartments() {
  const response = await DBclient("departments").select("*");

  return response.map((department) => {
    return {
      name: department.name,
      employeeID: department.employee_id,
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

export async function createDepartment(data) {
  await DBclient("departments").insert({
    name: data.name,
    employee_id: data.employeeID,
  });
  return null;
}
