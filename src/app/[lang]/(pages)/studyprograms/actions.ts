"use server";
import { StudyProgramPageRequest } from "@/app/_models/StudyProgram";
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
