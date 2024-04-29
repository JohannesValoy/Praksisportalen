"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

export async function fetchUserDetails(id: string) {
  const response = await DBclient.select("*")
    .from("users")
    .where("id", id)
    .first();

  return response;
}
