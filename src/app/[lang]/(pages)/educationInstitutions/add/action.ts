"use server";
import DBclient from "@/knex/config/DBClient";
import "server-only";

/**
 * The fetchEducationInstitution function fetches all education institutions from the database.
 * @returns A list of education institutions.
 */
export async function fetchEducationInstitution() {
  return await DBclient("educationInstitutions").select("name");
}

/**
 * The addEducationInstitution function adds a new education institution to the database.
 * @param data The education institution object to be added.
 */
export async function addEducationInstitution(data) {
  await DBclient("educationInstitutions").insert({ name: data });
}
