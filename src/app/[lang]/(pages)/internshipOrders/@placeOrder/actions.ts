"use server";

import DBclient from "@/knex/config/DBClient";
import { getUser } from "@/lib/auth";
import "server-only";

export async function fetchInternhipFields() {
  const response = await DBclient.table("internshipFields").select("*");

  return response.map((field) => {
    return {
      name: field.name,
    };
  }, {});
}

export async function addInternshipField(data) {
  await DBclient.table("internshipFields").insert({
    name: data,
  });
  return null;
}

export async function fetchStudyPrograms() {
  const user = await getUser();
  const query = await DBclient.from("coordinators")
    .where("email", user.email)
    .innerJoin(
      "studyPrograms",
      "studyPrograms.educationInstitutionID",
      "coordinators.educationInstitutionID",
    )
    .select("studyPrograms.name", "studyPrograms.id");
  const response = [];
  for (const row of query) {
    response.push({ name: row.name, id: row.id });
  }
  return response;
}

interface FormData {
  studyProgramID: number;
  comment: string;
  fieldGroups: {
    internshipField: string;
    subFieldGroups: {
      studyYear: number;
      numStudents: number;
      startWeek: Date;
      endWeek: Date;
    }[];
  }[];
}

export async function sendOrder(data: FormData) {
  try {
    await DBclient.transaction(async () => {
      // Insert into internshipOrders table
      const [internshipOrderId] = await DBclient.table(
        "internshipOrders",
      ).insert({
        studyProgramID: data.studyProgramID,
        comment: data.comment,
      });
      // For each fieldGroup in data, insert into fieldGroups table
      for (const fieldGroup of data.fieldGroups) {
        const [fieldGroupId] = await DBclient.table("fieldGroups").insert({
          internshipField: fieldGroup.internshipField,
          internshipOrderID: internshipOrderId,
        });
        // For each subFieldGroup in fieldGroup, insert into subFieldGroups table
        for (const subFieldGroup of fieldGroup.subFieldGroups) {
          if (subFieldGroup.numStudents > 0) {
            await DBclient.table("subFieldGroups").insert({
              studyYear: subFieldGroup.studyYear,
              numStudents: subFieldGroup.numStudents,
              startWeek: subFieldGroup.startWeek,
              endWeek: subFieldGroup.endWeek,
              fieldGroupID: fieldGroupId,
            });
          }
        }
      }
    });
  } catch (error) {
    console.error("Error creating internship order:", error);
    throw error;
  }
}
