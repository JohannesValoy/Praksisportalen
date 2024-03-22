/** @format */

import DBclient from "@/knex/config/DBClient";

export async function GET(request: Request) {
  const users = await DBclient.from("users").select("*");
  return Response.json(users);
}
