/** @format */

"use server";
import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";
import { getInternshipPositionObjectByPageRequest } from "@/services/InternshipPositionService";
import "server-only";

export async function paginateInternships(
  request: InternshipPaginationRequest
) {
  return await getInternshipPositionObjectByPageRequest(request);
}
