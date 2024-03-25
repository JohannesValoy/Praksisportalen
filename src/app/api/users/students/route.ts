/** @format */

import DBclient from "@/knex/config/DBClient";

export async function GET(request: Request) {
  const students = await DBclient.from("users")
    .where({ role: "student" })
    .select("*");
  return Response.json(students);
}
