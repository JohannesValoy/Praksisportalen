/** @format */

"use server";
import { EducationInstitutionPageRequest } from "@/app/_models/EducationInstitution";
import {
  getEducationInstitutionsByPageRequest,
  deleteEducationInstitutionByID,
} from "@/services/EducationInstituteService";
import "server-only";
export async function paginateEducationInstitutions(
  request: EducationInstitutionPageRequest
) {
  return await getEducationInstitutionsByPageRequest(request);
}

export async function deleteEducationInstitution(id: number) {
  return await deleteEducationInstitutionByID(id);
}
