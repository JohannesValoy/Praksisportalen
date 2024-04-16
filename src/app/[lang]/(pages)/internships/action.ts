/** @format */

"use server";
import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";
import { getInternshipPositionObjectByPageRequest } from "@/services/InternshipPosition";
import "server-only";

export async function paginateInternships(
  request: InternshipPaginationRequest
) {
  return (await getInternshipPositionObjectByPageRequest(request)).toJSON();
}
