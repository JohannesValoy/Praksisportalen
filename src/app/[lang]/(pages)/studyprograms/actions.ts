/** @format */

"use server";
import { getStudyProgramsByPageRequest } from "@/services/StudyProgram";
import "server-only";

export async function paginateStudyPrograms(request: StudyProgramPageRequest) {
  return (await getStudyProgramsByPageRequest(request)).toJSON();
}
