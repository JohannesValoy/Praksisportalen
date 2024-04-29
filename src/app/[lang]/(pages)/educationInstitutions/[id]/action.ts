"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

export async function fetchEducationInstitutionDetails(id: string) {
  const response = await DBclient.select("*")
    .from("educationInstitutions")
    .where("id", id)
    .first();

  return response;
}

export async function editDetails(id: string, update: any) {
  await DBclient("educationInstitutions").where("id", id).update(update);
}
