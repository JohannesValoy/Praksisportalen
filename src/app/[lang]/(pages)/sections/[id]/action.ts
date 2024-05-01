"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

export async function fetchSectionTypes() {
  const response = await DBclient.select("*").from("sectionTypes");

  return response;
}

export async function editSectionDetails(id: number, data: any) {
  const response = await DBclient("sections").where("id", id).update(data);

  return response;
}
