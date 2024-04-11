/** @format */

import DBclient from "@/knex/config/DBClient";

export async function GET(request: Request) {
  const internshipAgreements = await DBclient.from(
    "internshipAgreements",
  ).select("*");
  return Response.json(internshipAgreements);
}
