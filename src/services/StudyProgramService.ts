/** @format */

import { StudyProgramTable } from "knex/types/tables.js";
import { getEducationInstitutionByIDList } from "./EducationInstituteService";
import DBclient from "@/knex/config/DBClient";
import {
  StudyProgram,
  StudyProgramPageRequest,
} from "@/app/_models/StudyProgram";
import "server-only";
import { PageResponse } from "@/app/_models/pageinition";

async function getStudyProgramObjectByID(id: number): Promise<StudyProgram> {
  const studyProgram = (await getStudyProgramObjectByIDList([id])).get(id);
  if (studyProgram == undefined) {
    throw new Error("Study Program not found");
  }
  return studyProgram;
}

async function getStudyProgramObjectByIDList(
  idList: number[],
): Promise<Map<number, StudyProgram>> {
  const query = await DBclient.select()
    .from<StudyProgramTable>("studyPrograms")
    .whereIn("id", idList);
  const studyPrograms: Map<number, StudyProgram> = new Map();
  const educationInstitutionIDs = new Set(
    query.map((studyProgram) => studyProgram.educationInstitution_id),
  );
  const educationInstitutions = await getEducationInstitutionByIDList(
    educationInstitutionIDs,
  );
  for (const studyProgram of query) {
    studyPrograms.set(studyProgram.id, {
      ...studyProgram,
      educationInstitution: educationInstitutions.get(
        studyProgram.educationInstitution_id,
      ),
    });
  }
  return studyPrograms;
}

async function getStudyProgramsByPageRequest(
  pageRequest: StudyProgramPageRequest, //to be changed
): Promise<PageResponse<StudyProgram>> {
  const baseQuery = await DBclient.select()
    .from<StudyProgramTable>("studyPrograms")
    .where((builder) => {
      if (pageRequest.containsName) {
        builder.where("name", "like", `%${pageRequest.containsName}%`);
      }
    })
    .orderBy(pageRequest.sort);
  const pageQuery = baseQuery.slice(
    pageRequest.page * pageRequest.size,
    (pageRequest.page + 1) * pageRequest.size,
  );
  const studyPrograms = await getStudyProgramObjectByIDList(
    pageQuery.map((studyProgram) => studyProgram.id),
  );
  return {
    ...pageRequest,
    elements: Array.from(studyPrograms.values()),
    totalElements: baseQuery.length,
    totalPages: Math.ceil(baseQuery.length / pageRequest.size),
  } as PageResponse<StudyProgram>;
}

export {
  getStudyProgramObjectByID,
  getStudyProgramObjectByIDList,
  getStudyProgramsByPageRequest,
};
