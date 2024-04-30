"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

export async function editDepartmentDetails(id: number, update: any) {
  await DBclient("departments").where("id", id).update(update);
}
