"use server";
import { StudyProgramPageRequest } from "@/app/_models/StudyProgram";
import DBclient from "@/knex/config/DBClient";
import {
  getStudyProgramsByPageRequest,
  deleteStudyProgramByID,
} from "@/services/StudyProgramService";
import "server-only";
/**
 * Fetches a {@link PageResponse} with {@link StudyProgram}s.
 * @param request The page request.
 * @returns A page response with study programs.
 */
export async function paginateStudyPrograms(request: StudyProgramPageRequest) {
  return await getStudyProgramsByPageRequest(request);
}

/**
 * Deletes a study program by its id.
 * @param id The id of the study program.
 * @returns The deleted study program.
 */
export async function deleteStudyProgram(id: number) {
  return await deleteStudyProgramByID(id);
}

/**
 * The fetchStudyPrograms function fetches all study programs from the database.
 * @returns A list of study programs.
 */
export async function fetchStudyPrograms() {
  return await DBclient("studyPrograms").select(
    "name",
    "educationInstitutionID",
  );
}

/**
 * The fetchEducationInstitutions function fetches all education institutions from the database.
 * @returns A list of education institutions.
 */
export async function fetchEducationInstitutions() {
  return await DBclient("educationInstitutions").select("name", "id");
}

/**
 * The addStudyProgram function adds a new study program to the database.
 * @param data The study program object to be added.
 */
export async function addStudyProgram(data) {
  await DBclient("studyPrograms").insert({
    name: data.name,
    educationInstitutionID: data.educationInstitutionID,
  });
}
