"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

export async function fetchEmployees() {
  const response = await DBclient("employees").select("*");

  return response.map((employee) => {
    return {
      email: employee.email,
    };
  }, {});
}

export async function createEmployee(data) {
  await DBclient("employees").insert({
    name: data.name,
    email: data.email,
    role: data.role,
    password: data.password,
  });
  return null;
}

export async function fetchCoordinators() {
  const response = await DBclient("coordinators").select("*");

  return response.map((Coordinator) => {
    return {
      email: Coordinator.email,
    };
  }, {});
}

export async function createCoordinator(data) {
  await DBclient("coordinators").insert({
    name: data.name,
    email: data.email,
    password: data.password,
  });
  return null;
}

export async function fetchStudents() {
  const response = await DBclient("students").select("*");

  return response.map((student) => {
    return {
      email: student.email,
    };
  }, {});
}

export async function createStudent(data) {
  await DBclient("students").insert({
    name: data.name,
    email: data.email,
  });
  return null;
}
