/** @format */

import { StudyProgramTable } from "knex/types/tables.js";
import { getEducationInstitutionByIDList } from "./EducationInstitute";
import DBclient from "@/knex/config/DBClient";
import StudyProgramObject from "@/app/_models/StudyProgram";
import "server-only";
import { PageResponse } from "@/app/_models/pageinition";

async function getStudyProgramObjectByID(
  id: number
): Promise<StudyProgramObject> {
  const studyProgram = (await getStudyProgramObjectByIDList([id])).get(id);
  if (studyProgram == undefined) {
    throw new Error("Study Program not found");
  }
  return studyProgram;
}

async function getStudyProgramObjectByIDList(
  idList: number[]
): Promise<Map<number, StudyProgramObject>> {
  const query = await DBclient.select()
    .from<StudyProgramTable>("study_program")
    .whereIn("id", idList);
  const studyPrograms: Map<number, StudyProgramObject> = new Map();
  const educationInstitutionIDs = new Set(
    query.map((studyProgram) => studyProgram.educationInstitution_id)
  );
  const educationInstitutions = await getEducationInstitutionByIDList(
    educationInstitutionIDs
  );
  for (const studyProgram of query) {
    studyPrograms.set(
      studyProgram.id,
      new StudyProgramObject(
        studyProgram,
        educationInstitutions.get(studyProgram.educationInstitution_id)
      )
    );
  }
  return studyPrograms;
}

async function getStudyProgramsByPageRequest(
  pageRequest: StudyProgramPageRequest //to be changed
): Promise<PageResponse<StudyProgramObject>> {
  const baseQuery = await DBclient.select()
    .from<StudyProgramTable>("study_program")
    .where((builder) => {
      if (pageRequest.name) {
        builder.where("name", "like", `%${pageRequest.name}%`);
      }
    })
    .orderBy(pageRequest.sort);
  const pageQuery = baseQuery.slice(
    pageRequest.page * pageRequest.size,
    (pageRequest.page + 1) * pageRequest.size
  );
  const studyPrograms = await getStudyProgramObjectByIDList(
    pageQuery.map((studyProgram) => studyProgram.id)
  );
  return new PageResponse<StudyProgramObject>(
    pageRequest,
    Array.from(studyPrograms.values()),
    baseQuery.length
  );
}

export {
  getStudyProgramObjectByID,
  getStudyProgramObjectByIDList,
  getStudyProgramsByPageRequest,
};
