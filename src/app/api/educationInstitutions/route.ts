/** @format */

import DBclient from "@/knex/config/DBClient";

export async function GET(request: Request) {
  const educationInstitutions = await DBclient.from(
    "educationInstitutions"
  ).select("*");
  return Response.json(educationInstitutions);
}
