"use server";
import { Role } from "@/app/api/auth/[...nextauth]/nextauth";

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

export async function placeOrder(data) {
  const response = await DBclient.table("internshipOrders").insert(data);
  return response;
}
