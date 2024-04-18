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
      "studyPrograms.educationInstitution_id",
      "coordinators.educationInstitution_id"
    )
    .select("studyPrograms.name", "studyPrograms.id");
  const response = [];
  for (const row of query) {
    response.push({ name: row.name, id: row.id });
  }
  return response;
}

export async function sendOrder(data) {
  try {
    await DBclient.transaction(async () => {
      // Insert into internshipOrders table
      const [internshipOrderId] = await DBclient.table(
        "internshipOrders"
      ).insert({
        studyProgram_id: data.studyProgram_id,
        comment: data.comment,
      });
      // For each fieldGroup in data, insert into fieldGroups table
      for (const fieldGroup of data.fieldGroups) {
        const [fieldGroupId] = await DBclient.table("fieldGroups").insert({
          internshipField: fieldGroup.internshipField,
          internshipOrder_id: internshipOrderId,
        });
        // For each subFieldGroup in fieldGroup, insert into subFieldGroups table
        for (const subFieldGroup of fieldGroup.subFieldGroups) {
          if (subFieldGroup.numStudents > 0) {
            await DBclient.table("subFieldGroups").insert({
              studyYear: subFieldGroup.studyYear,
              numStudents: subFieldGroup.numStudents,
              startWeek: subFieldGroup.startWeek,
              endWeek: subFieldGroup.endWeek,
              fieldGroup_id: fieldGroupId,
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
