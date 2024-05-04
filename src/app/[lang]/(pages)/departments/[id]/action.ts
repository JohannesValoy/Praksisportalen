"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

/**
 * The fetchDepartments function fetches all departments from the database.
 * @returns A list of departments.
 * @param id The user object.
 * @param update The update object.
 */
export async function editDepartmentDetails(id: number, update: any) {
  await DBclient("departments").where("id", id).update(update);
}
