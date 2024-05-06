"use server";

import "server-only";
import DBClient from "@/knex/config/DBClient";

/**
 * The addInternship function adds a new internship to the database.
 * @param id The user object.
 * @param update The update object.
 */
export async function editDetails(id: number, update: any) {
  await DBClient.from("internships").where({ id }).update(update);
}
