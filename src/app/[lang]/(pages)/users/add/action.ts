"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

/**
 * The fetchEmployees function fetches all employees from the database.
 * @returns A list of employees.
 */
export async function fetchEmployees() {
  const response = await DBclient("employees").select("*");

  return response.map((employee) => {
    return {
      email: employee.email,
    };
  }, {});
}

/**
 * The createEmployee function adds a new employee to the database.
 * @param data The employee object to be added.
 */
export async function createEmployee(data) {
  await DBclient("employees").insert({
    name: data.name,
    email: data.email,
    role: data.role,
    password: data.password,
  });
}

/**
 * The fetchCoordinators function fetches all coordinators from the database.
 * @returns A list of coordinators.
 */
export async function fetchCoordinators() {
  const response = await DBclient("coordinators").select("*");

  return response.map((Coordinator) => {
    return {
      email: Coordinator.email,
    };
  }, {});
}

/**
 * The createCoordinator function adds a new coordinator to the database.
 * @param data The coordinator object to be added.
 */
export async function createCoordinator(data) {
  await DBclient("coordinators").insert({
    name: data.name,
    email: data.email,
    password: data.password,
  });
}

/**
 * The fetchStudents function fetches all students from the database.
 * @returns A list of students.
 */
export async function fetchStudents() {
  const response = await DBclient("students").select("*");

  return response.map((student) => {
    return {
      email: student.email,
    };
  }, {});
}

/**
 * The createStudent function adds a new student to the database.
 * @param data The student object to be added.
 */
export async function createStudent(data) {
  await DBclient("students").insert({
    name: data.name,
    email: data.email,
  });
}
