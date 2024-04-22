/** @format */

import DBclient from "@/knex/config/DBClient";

//FIXME: Actually use pageRequests
export async function GET(request: Request) {
  const internshipFields = await DBclient.from("internshipFields").select("*");
  return Response.json(internshipFields);
}

export async function POST(request: Request) {
  const { name } = await request.json();
  const newInternshipField = await DBclient.table("internshipFields").insert({
    name,
  });
  return Response.json(newInternshipField);
}
