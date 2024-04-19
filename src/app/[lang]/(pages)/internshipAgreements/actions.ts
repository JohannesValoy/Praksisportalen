/** @format */

"use server";
import { InternshipAgreementPageRequest } from "@/app/_models/Agreement";
import { deleteInternshipAgreementByID, getInternshipAgreementsByPageRequest } from "@/services/AgreementService";

import "server-only";

export async function paginateInternshipAgreements(
  request: InternshipAgreementPageRequest
) {
  return await getInternshipAgreementsByPageRequest(request);
}

export async function deleteInternshipAgreement(id: number) {
  return await deleteInternshipAgreementByID(id);
}
