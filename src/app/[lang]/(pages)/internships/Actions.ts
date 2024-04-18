"use server";
import DBclient from "@/knex/config/DBClient";
import "server-only";

export async function getInternshipTypes() {
  return await DBclient.select().from("internshipFields");
}
