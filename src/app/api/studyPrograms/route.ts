/** @format */

import DBclient from "@/knex/config/DBClient";

export async function GET(request: Request) {
  const studyPrograms = await DBclient.from("studyPrograms").select("*");
  return Response.json(studyPrograms);
}
