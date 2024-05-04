"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

/**
 * The fetchEducationInstitutions function fetches all education institutions from the database.
 * @param id The id object to be applied.
 * @param update The update object to be applied.
 * @returns A list of education institutions.
 */
export async function editDetails(id: number, update: any) {
  await DBclient("educationInstitutions").where("id", id).update(update);
}
