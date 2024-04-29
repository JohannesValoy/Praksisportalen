"use server";

import DBclient from "@/knex/config/DBClient";
import { getSectionObjectByID } from "@/services/SectionService";
import "server-only";

export async function fetchSectionDetails(id: string) {
  const response = await DBclient.select("*")
    .from("sections")
    .where("id", id)
    .first();

  return await getSectionObjectByID(response.id);
}

export async function fetchSectionTypes() {
  const response = await DBclient.select("*").from("section_types");

  return response;
}

export async function editSectionDetails(id: string, data: any) {
  const response = await DBclient("sections").where("id", id).update(data);

  return response;
}
