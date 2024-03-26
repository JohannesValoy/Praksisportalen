/** @format */

import DBclient from "@/knex/config/DBClient";

export async function GET(request: Request) {
  const sectionTypes = await DBclient.from("sectionTypes").select("*");
  return Response.json(sectionTypes);
}

export async function POST(request: Request) {
  const { name } = await request.json();
  const newSectionType = await DBclient.table("sectionTypes").insert({
    name,
  });
  return Response.json(newSectionType);
}
