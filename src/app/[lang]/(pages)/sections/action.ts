/** @format */

"use server";
import { SectionPageRequest } from "@/app/_models/Section";
import { getSectionsByPageRequest } from "@/services/Section";
import "server-only";

export async function paginateSections(request: SectionPageRequest) {
  return (await getSectionsByPageRequest(request)).toJSON();
}
