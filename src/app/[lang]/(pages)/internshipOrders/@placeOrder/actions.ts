"use server";

import DBclient from "@/knex/config/DBClient";
import { getUser } from "@/lib/auth";
import "server-only";
/**
 * Fetches ****ALL**** the internship fields from the database.
 * @returns ****ALL**** the internship fields name.
 */
export async function fetchInternhipFields() {
  return await DBclient.table("internshipFields").select("*");
}

/**
 * Adds a new internship field to the database.
 * @param data The name of the new internship field.
 * @returns always null
 */
export async function addInternshipField(data) {
  await DBclient.table("internshipFields").insert({
    name: data,
  });
}

/**
 * Fetches ****ALL****  of the study programs that the coordinator is responsible for.
 * @returns ****ALL**** the study programs name and id.
 */
export async function fetchStudyPrograms() {
  const user = await getUser();

  const query = await DBclient.from("coordinators")
    .where("coordinators.id", user.id)
    .innerJoin(
      "studyPrograms",
      "studyPrograms.educationInstitutionID",
      "coordinators.educationInstitutionID"
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
/**
 * Adds the order to the database.
 * @param data The order data.
 * @throws error if it fails to add the internship order.
 */
export async function sendOrder(data: FormData) {
  try {
    const user = await getUser();
    await DBclient.transaction(async (trx) => {
      // Insert into internshipOrders table
      const [internshipOrderId] = await trx.table("internshipOrders").insert({
        studyProgramID: data.studyProgramID,
        comment: data.comment,
        coordinatorID: user.id,
      });

      // For each fieldGroup in data, insert into fieldGroups table
      for (const fieldGroup of data.fieldGroups) {
        const [fieldGroupId] = await trx.table("fieldGroups").insert({
          internshipField: fieldGroup.internshipField,
          internshipOrderID: internshipOrderId,
        });
        // For each subFieldGroup in fieldGroup, insert into subFieldGroups table
        for (const subFieldGroup of fieldGroup.subFieldGroups) {
          if (subFieldGroup.numStudents > 0) {
            await trx.table("subFieldGroups").insert({
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
    throw new Error("Failed to add internship order");
  }
}
