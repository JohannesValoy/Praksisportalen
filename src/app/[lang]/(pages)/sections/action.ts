/** @format */

"use server";
import { SectionPageRequest } from "@/app/_models/Section";
import {
  deleteSectionByID,
  getSectionsByPageRequest,
} from "@/services/SectionService";
import "server-only";

export async function paginateSections(request: SectionPageRequest) {
  console.log(request);
  request.department_id = Number(request.department_id);
  return await getSectionsByPageRequest(request);
}

export async function deleteSection(id: number) {
  return await deleteSectionByID(id);
}
