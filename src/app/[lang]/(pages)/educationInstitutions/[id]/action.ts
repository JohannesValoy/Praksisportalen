"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

export async function editDetails(id: number, update: any) {
  await DBclient("educationInstitutions").where("id", id).update(update);
}
