"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

export async function fetchStudyPrograms() {
  const response = await DBclient("studyPrograms").select("*");

  return response.map((study) => {
    return {
      name: study.name,
      eduID: study.educationInstitutionID,
    };
  }, {});
}

export async function fetchEducationInstitutions() {
  const response = await DBclient("educationInstitutions").select("*");

  return response.map((edu) => {
    return {
      name: edu.name,
      id: edu.id,
    };
  }, {});
}

export async function addStudyProgram(data) {
  await DBclient("studyPrograms").insert({
    name: data.name,
    educationInstitutionID: data.educationInstitutionID,
  });
  return null;
}
