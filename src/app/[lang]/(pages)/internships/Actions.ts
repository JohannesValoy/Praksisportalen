/** @format */

"use server";
import DBclient from "@/knex/config/DBClient";
import "server-only";
//TODO: Move this to actions file
export async function getInternshipTypes() {
  return await DBclient.select().from("internshipFields");
}
