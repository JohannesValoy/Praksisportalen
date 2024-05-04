"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

/**
 * The fetchSections function fetches all sections from the database.
 * @returns A list of sections.
 */
export async function fetchSectionTypes() {
  return await DBclient.select("*").from("sectionTypes");
}

/**
 * The fetchSections function fetches all sections from the database.
 * @returns A list of sections.
 */
export async function editSectionDetails(id: number, data: any) {
  return await DBclient("sections").where("id", id).update(data);
}
