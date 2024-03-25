/** @format */

import DBclient from "@/knex/config/DBClient";

export async function GET(request: Request) {
  const internships = await DBclient.from("internships").select("*");
  return Response.json(internships);
}
