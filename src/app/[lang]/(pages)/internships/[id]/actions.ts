/** @format */

"use server";

import "server-only";
import DBClient from "@/knex/config/DBClient";

export async function editDetails(id: number, update: any) {
  await DBClient.from("internships").where({ id }).update(update);
}
