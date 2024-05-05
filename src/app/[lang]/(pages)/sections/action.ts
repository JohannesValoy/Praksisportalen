"use server";
import { SectionPageRequest } from "@/app/_models/Section";
import {
  deleteSectionByID,
  getSectionsByPageRequest,
} from "@/services/SectionService";
import "server-only";
/**
 * Paginates the Sections and returns a {@link PageResponse} with a modified {@link Section}s
 * objects.
 * @param request The page request.
 * @returns A page response with sections.
 */
export async function paginateSections(request: SectionPageRequest) {
  const data = await getSectionsByPageRequest(request);

  // If data.elements is present, map over it to create a new array
  // where each element is a flattened version of the original element.
  // If data.elements is not present, use data directly.
  const elements = data.elements.map((element) => ({
    name: element.name,
    email: element.employee?.email || "",
    sectionType: element?.sectionType,
    id: element.id,
    createdAt: element.createdAt,
    updatedAt: element.updatedAt,
  }));
  return {
    ...data,
    elements,
  };
}

/**
 * Deletes a section by its id.
 * @param id The id of the section.
 * @returns The deleted section.
 */
export async function deleteSection(id: number) {
  return await deleteSectionByID(id);
}
