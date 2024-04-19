/** @format */

"use server";
import { StudyProgramPageRequest } from "@/app/_models/StudyProgram";
import { getStudyProgramsByPageRequest } from "@/services/StudyProgramService";
import { deleteStudyProgramByID } from "@/services/StudyProgramService";
import "server-only";

export async function paginateStudyPrograms(request: StudyProgramPageRequest) {
  return await getStudyProgramsByPageRequest(request);
}


export async function deleteStudyProgram(id: number) {
  return await deleteStudyProgramByID(id);
}