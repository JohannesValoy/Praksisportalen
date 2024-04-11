/** @format */

import { EducationInstitutionPageRequest } from "@/app/_models/EducationInstitution";
import DBclient from "@/knex/config/DBClient";
import { getEducationInstitutionsByPageRequest } from "@/services/EducationInstitute";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const pageRequest = EducationInstitutionPageRequest.fromRequest(request);
  return Response.json(
    await getEducationInstitutionsByPageRequest(pageRequest),
  );
}

export async function POST(request: Request) {
  const { name } = await request.json();
  const newEducationInstitution = await DBclient.table(
    "educationInstitutions",
  ).insert({
    name,
  });
  return Response.json(newEducationInstitution);
}
