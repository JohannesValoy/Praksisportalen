"use server";

import "server-only";
import DBClient from "@/knex/config/DBClient";

/**
 * The addInternship function adds a new internship to the database.
 * @param internship The internship object to be added.
 */
export async function editDetails(id: number, update: any) {
  await DBClient.from("internships").where({ id }).update(update);
}
