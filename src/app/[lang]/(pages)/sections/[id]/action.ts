"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

/**
 * The fetchSections function fetches all sections from the database.
 * @param id The user object.
 * @param data The data object.
 * @returns Updated list of sections.
 */
export async function editSectionDetails(id: number, data: any) {
  return await DBclient("sections").where("id", id).update(data);
}
