"use server";
import { InternshipAgreementPageRequest } from "@/app/_models/Agreement";
import {
  deleteInternshipAgreementByID,
  getInternshipAgreementsByPageRequest,
} from "@/services/AgreementService";

import "server-only";
/**
 * Paginates the InternshipAgreements and returns a {@link PageResponse} with modified {@link InternshipAgreement}s
 * @param request The page request.
 * @returns A page response with internship agreements.
 */
export async function paginateInternshipAgreements(
  request: InternshipAgreementPageRequest,
) {
  const data = await getInternshipAgreementsByPageRequest(request);

  // If data.elements is present, map over it to create a new array
  // where each element is a flattened version of the original element.
  // If data.elements is not present, use data directly.
  const elements = data.elements.map((element) => ({
    id: element.id,
    internship: element.internship.name,
    studyProgram: element.studyProgram.name,
    student: element.student?.name,
    startDate: element.startDate.toLocaleDateString(),
    endDate: element.endDate.toLocaleDateString(),
  }));

  return {
    ...data,
    elements,
  };
}
/**
 * Deletes a internship agreement by its id.
 * @param id  The id of the internship agreement.
 */
export async function deleteInternshipAgreement(id: number) {
  await deleteInternshipAgreementByID(id);
}
