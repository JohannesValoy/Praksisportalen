/** @format */

"use server";
import { SectionPageRequest } from "@/app/_models/Section";
import {
  deleteSectionByID,
  getSectionsByPageRequest,
} from "@/services/SectionService";
import "server-only";

export async function paginateSections(request: SectionPageRequest) {
  const data = await getSectionsByPageRequest(request);

  // If data.elements is present, map over it to create a new array
  // where each element is a flattened version of the original element.
  // If data.elements is not present, use data directly.
  const elements = data.elements.map((element) => ({
    name: element.name,
    email: element.employee.email,
    section_type: element.section_type,
    id: element.id,
    created_at: element.created_at,
    updated_at: element.updated_at,
  }));
  return {
    ...data,
    elements,
  };
}

export async function deleteSection(id: number) {
  return await deleteSectionByID(id);
}
