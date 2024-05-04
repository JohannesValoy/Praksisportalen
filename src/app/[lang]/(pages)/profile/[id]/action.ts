"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

/**
 * The fetchUserDetails function fetches the details of a user from the database.
 * @param id The id of the user.
 * @returns The details of the user.
 */
export async function fetchUserDetails(id: string) {
  const response = await DBclient.select("*")
    .from("users")
    .where("id", id)
    .first();

  return response;
}
