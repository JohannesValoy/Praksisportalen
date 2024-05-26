"use server";

import DBclient from "@/knex/config/DBClient";
import { encryptPassword } from "@/lib/auth";
import { User } from "next-auth";
import { revalidatePath } from "next/cache";
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

/**
 * The updateUserDetails function updates the details of a user in the database.
 * @param user The user.
 * @param data The data to update.
 * @param path The path to revalidate.
 * @returns The updated user details.
 */
export async function updateUserDetails(user: User, data: any, path: string) {
  if (data.password) {
    data.password = await encryptPassword(data.password);
  }
  if (user.role === "admin" || user.role === "user") {
    await DBclient("employees").where("id", user.id).update(data);
  }
  if (user.role === "student") {
    await DBclient("students").where("id", user.id).update(data);
  }
  if (user.role === "coordinator") {
    await DBclient("coordinators").where("id", user.id).update(data);
  }
  revalidatePath(path);
}
