"use server";
import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";
import DBclient from "@/knex/config/DBClient";
import {
  deleteInternshipByID,
  getInternshipPositionObjectByPageRequest,
} from "@/services/InternshipPositionService";
import "server-only";
/**
 * Paginates the internships and returns a {@link PageResponse} with {@link InternshipPosition}s
 * @param request The page request.
 * @returns A page response with internships.
 */
export async function paginateInternships(
  request: InternshipPaginationRequest
) {
  request.sectionID = Number(request.sectionID);
  return await getInternshipPositionObjectByPageRequest(request);
}
/**
 * Deletes a internship by its id.
 * @param id  The id of the internship.
 * @returns The deleted internship.
 */
export async function deleteInternship(id: number) {
  return await deleteInternshipByID(id);
}

/**
 * Gets ****ALL**** internship types
 * @returns ****ALL**** internship types
 */
export async function getInternshipTypes() {
  return await DBclient.select().from("internshipFields");
}
