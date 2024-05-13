"use server";
import { EducationInstitutionPageRequest } from "@/app/_models/EducationInstitution";
import DBclient from "@/knex/config/DBClient";
import {
  getEducationInstitutionsByPageRequest,
  deleteEducationInstitutionByID,
} from "@/services/EducationInstituteService";
import "server-only";

/**
 * Paginates the EducationInstitutions and returns a {@link PageResponse} with {@link EducationInstitution}s
 * @param request The page request.
 * @returns A page response with education institutions.
 */
export async function paginateEducationInstitutions(
  request: EducationInstitutionPageRequest,
) {
  return await getEducationInstitutionsByPageRequest(request);
}

/**
 * Deletes a education institution by its id.
 * @param id The id of the education institution.
 * @returns The deleted education institution.
 */
export async function deleteEducationInstitution(id: number) {
  return await deleteEducationInstitutionByID(id);
}

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
