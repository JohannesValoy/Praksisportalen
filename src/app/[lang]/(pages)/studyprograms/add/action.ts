"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

/**
 * The fetchStudyPrograms function fetches all study programs from the database.
 * @returns A list of study programs.
 */
export async function fetchStudyPrograms() {
  return await DBclient("studyPrograms").select(
    "name",
    "educationInstitutionID",
  );
}

/**
 * The fetchEducationInstitutions function fetches all education institutions from the database.
 * @returns A list of education institutions.
 */
export async function fetchEducationInstitutions() {
  return await DBclient("educationInstitutions").select("name", "id");
}

/**
 * The addStudyProgram function adds a new study program to the database.
 * @param data The study program object to be added.
 */
export async function addStudyProgram(data) {
  await DBclient("studyPrograms").insert({
    name: data.name,
    educationInstitutionID: data.educationInstitutionID,
  });
}
