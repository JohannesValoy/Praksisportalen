"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

/**
 * The fetchSections function fetches all sections from the database.
 * @returns A list of sections.
 */
export async function fetchSectionTypes() {
  const response = await DBclient.select("*").from("sectionTypes");

  return response;
}

/**
 * The fetchSections function fetches all sections from the database.
 * @returns A list of sections.
 */
export async function editSectionDetails(id: number, data: any) {
  const response = await DBclient("sections").where("id", id).update(data);

  return response;
}
