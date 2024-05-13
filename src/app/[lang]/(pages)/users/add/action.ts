"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

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
 * The createCoordinator function adds a new coordinator to the database.
 * @param data The coordinator object to be added.
 */
export async function createCoordinator(data) {
  await DBclient("coordinators").insert({
    name: data.name,
    email: data.email,
    password: data.password,
    educationInstitutionID: data.educationInstitutionID,
  });
}

/**
 * The createStudent function adds a new student to the database.
 * @param data The student object to be added.
 */
export async function createStudent(data) {
  await DBclient("students").insert({
    name: data.name,
    email: data.email,
    educationInstitutionID: data.educationInstitutionID,
  });
}
