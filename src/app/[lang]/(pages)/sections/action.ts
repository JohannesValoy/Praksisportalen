/** @format */

"use server";
import { SectionPageRequest } from "@/app/_models/Section";
import { getSectionsByPageRequest } from "@/services/SectionService";
import "server-only";

export async function paginateSections(request: SectionPageRequest) {
  request.page = request.page || 0;
  request.size = request.size || 10;
  return await getSectionsByPageRequest(request);
}
