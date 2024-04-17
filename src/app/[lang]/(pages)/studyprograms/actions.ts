/** @format */

"use server";
import { CoordinatorPageRequest } from "@/app/_models/Coordinator";
import { getCoordinatorsByPageRequest } from "@/services/Coordinator";
import "server-only";

export async function paginateStudyPrograms(request: StudyProgramPageRequest) {
  return (await getStudyProgramsByPagerequest(request)).toJSON();
}
