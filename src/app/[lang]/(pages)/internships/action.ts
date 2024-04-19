/** @format */

"use server";
import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";
import {
  deleteInternshipByID,
  getInternshipPositionObjectByPageRequest,
} from "@/services/InternshipPositionService";
import "server-only";

export async function paginateInternships(
  request: InternshipPaginationRequest
) {
  return await getInternshipPositionObjectByPageRequest(request);
}

export async function deleteInternship(id: number) {
  return await deleteInternshipByID(id);
}
