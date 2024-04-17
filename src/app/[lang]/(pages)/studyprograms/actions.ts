/** @format */

"use server";
import { StudyProgramPageRequest } from "@/app/_models/StudyProgram";
import { getStudyProgramsByPageRequest } from "@/services/StudyProgramService";
import "server-only";

export async function paginateStudyPrograms(request: StudyProgramPageRequest) {
  return await getStudyProgramsByPageRequest(request);
}
