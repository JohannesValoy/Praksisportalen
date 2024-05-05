"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

/**
 * The fetchEmployees function fetches all employees from the database.
 * @returns A list of employees.
 */
export async function fetchEmployeesEmail() {
  return await DBclient("employees").select("email");
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
export async function fetchCoordinatorsEmail() {
  return await DBclient("coordinators").select("email");
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
export async function fetchStudentsEmail() {
  return await DBclient("students").select("email");
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
