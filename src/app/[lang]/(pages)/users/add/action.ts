"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

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
