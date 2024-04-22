/** @format */

import DBclient from "@/knex/config/DBClient";

//FIXME: Actually use pageRequest
export async function GET(request: Request) {
  const studyPrograms = await DBclient.from("studyPrograms").select("*");
  return Response.json(studyPrograms);
}

export async function POST(request: Request) {
  const { name, educationInstitution_id } = await request.json();
  const newStudyProgram = await DBclient.table("studyPrograms").insert({
    name,
    educationInstitution_id,
  });
  return Response.json(newStudyProgram);
}
