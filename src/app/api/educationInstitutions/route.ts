/** @format */

import DBclient from "@/knex/config/DBClient";

export async function GET(request: Request) {
  const educationInstitutions = await DBclient.from(
    "educationInstitutions"
  ).select("*");
  return Response.json(educationInstitutions);
}

export async function POST(request: Request) {
  const { name } = await request.json();
  const newEducationInstitution = await DBclient.table(
    "educationInstitutions"
  ).insert({
    name,
  });
  console.log(newEducationInstitution);
  return Response.json(newEducationInstitution);
}
