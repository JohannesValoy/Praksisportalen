/** @format */

"use server";
import { InternshipAgreementPageRequest } from "@/app/_models/Agreement";
import { getInternshipAgreementsByPageRequest } from "@/services/AgreementService";

import "server-only";

export async function paginateInternshipAgreements(
  request: InternshipAgreementPageRequest,
) {
  return await getInternshipAgreementsByPageRequest(request);
}
