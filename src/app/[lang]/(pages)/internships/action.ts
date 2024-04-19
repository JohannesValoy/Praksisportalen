/** @format */

"use server";
import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";
import {
  deleteInternshipByID,
  getInternshipPositionObjectByPageRequest,
  getInternshipPositionObjectBySectionID,
} from "@/services/InternshipPositionService";
import "server-only";

export async function paginateInternships(
  request: InternshipPaginationRequest
) {
  request.section_id = [Number(request.section_id)] || [];
  return await getInternshipPositionObjectByPageRequest(request);
}
export async function deleteInternship(id: number) {
  return await deleteInternshipByID(id);
}
