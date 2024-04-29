/** @format */

"use server";
import { InternshipAgreementPageRequest } from "@/app/_models/Agreement";
import {
  deleteInternshipAgreementByID,
  getInternshipAgreementsByPageRequest,
} from "@/services/AgreementService";

import "server-only";

export async function paginateInternshipAgreements(
  request: InternshipAgreementPageRequest
) {
  const data = await getInternshipAgreementsByPageRequest(request);

  // If data.elements is present, map over it to create a new array
  // where each element is a flattened version of the original element.
  // If data.elements is not present, use data directly.
  const elements = data.elements.map((element) => ({
    id: element.id,
    status: element.status,
    startDate: element.startDate.toLocaleDateString(),
    endDate: element.endDate.toLocaleDateString(),
  }));

  return {
    ...data,
    elements,
  };
}

export async function deleteInternshipAgreement(id: number) {
  return await deleteInternshipAgreementByID(id);
}
