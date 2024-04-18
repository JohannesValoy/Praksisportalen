/** @format */

"use server";
import { EducationInstitutionPageRequest } from "@/app/_models/EducationInstitution";
import { getEducationInstitutionsByPageRequest } from "@/services/EducationInstituteService";
import "server-only";
export async function paginateEducationInstitutions(
  request: EducationInstitutionPageRequest
) {
  return await getEducationInstitutionsByPageRequest(request);
}
