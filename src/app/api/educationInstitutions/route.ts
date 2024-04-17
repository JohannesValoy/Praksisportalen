/** @format */

import DBclient from "@/knex/config/DBClient";

//FIXME: Actually use pageRequest
export async function GET(request: Request) {
  const studyPrograms = await DBclient.from("educationInstitutions").select(
    "*"
  );
  return Response.json(studyPrograms);
}

export async function POST(request: Request) {
  const { name, educationInstitution_id } = await request.json();
  const newEducationInstitution = await DBclient.table(
    "educationInstitutions"
  ).insert({
    name,
  });
  return Response.json(newEducationInstitution);
}
