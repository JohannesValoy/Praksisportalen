"use server";

import { StudyProgramTable } from "knex/types/tables.js";
import { getEducationInstitutionByIDList } from "./EducationInstituteService";
import DBclient from "@/knex/config/DBClient";
import {
  StudyProgram,
  StudyProgramPageRequest,
} from "@/app/_models/StudyProgram";
import { PageResponse } from "@/app/_models/pageinition";
import "server-only";

/**
 * Get a study program by its id
 * @param id the id of the study program
 * @returns A {@link StudyProgram} object
 * @throws an error if no study program is found with the given id
 */
async function getStudyProgramObjectByID(id: number): Promise<StudyProgram> {
  const studyProgram = (await getStudyProgramObjectByIDList([id])).get(id);
  if (!studyProgram) {
    throw new Error("Study Program not found");
  }
  return studyProgram;
}

/**
 * This function fetches a list of study programs by their ids
 * @param idList a list of ids to fetch
 * @returns a map of study programs with the id as key.
 * The map will only contain the {@link StudyProgram} that were found
 */
async function getStudyProgramObjectByIDList(
  idList: number[],
): Promise<Map<number, StudyProgram>> {
  const query = await DBclient.select()
    .from<StudyProgramTable>("studyPrograms")
    .whereIn("id", idList);
  const studyPrograms: Map<number, StudyProgram> = new Map();
  const educationInstitutionIDs = new Set(
    query.map((studyProgram) => studyProgram.educationInstitutionID),
  );
  const educationInstitutions = await getEducationInstitutionByIDList(
    educationInstitutionIDs,
  );
  for (const studyProgram of query) {
    studyPrograms.set(studyProgram.id, {
      ...studyProgram,
      educationInstitution: educationInstitutions.get(
        studyProgram.educationInstitutionID,
      ),
    });
  }
  return studyPrograms;
}
/**
 * Creates a page of study programs based on the page request
 * @param pageRequest A {@link StudyProgramPageRequest}
 * @returns a {@link PageResponse} of study programs
 */
async function getStudyProgramsByPageRequest(
  pageRequest: StudyProgramPageRequest, //to be changed
): Promise<PageResponse<StudyProgram>> {
  const baseQuery = await DBclient.select("id")
    .from<StudyProgramTable>("studyPrograms")
    .where((builder) => {
      if (pageRequest.containsName) {
        builder.where("name", "like", `%${pageRequest.containsName}%`);
      }
      if (pageRequest.hasEducationInstitutionID) {
        builder.where(
          "educationInstitutionID",
          pageRequest.hasEducationInstitutionID,
        );
      }
    })
    .orderBy(
      ["id", "name"].includes(pageRequest.sort) ? pageRequest.sort : "id",
    );
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
/**
 * Deletes a study program by its id
 * @param id the id of the study program
 */
async function deleteStudyProgramByID(id: number) {
  try {
    const deletedCount = await DBclient.delete()
      .from("studyPrograms")
      .where("id", id);
    if (deletedCount === 0) {
      throw new Error(`Study program with id ${id} not found`);
    }
  } catch (error) {
    if (error.message.includes("foreign key constraint")) {
      throw new Error(
        `Cannot delete study program because it is referenced by these internship`,
      );
    }
    throw new Error("An error occurred while deleting the study program");
  }
}

export {
  getStudyProgramObjectByID,
  getStudyProgramObjectByIDList,
  getStudyProgramsByPageRequest,
  deleteStudyProgramByID,
};
