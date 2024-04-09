/** @format */

import { SectionPageRequest } from "@/app/_models/Section";
import { getSectionsByPageRequest } from "@/services/Section";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const pageRequest = SectionPageRequest.fromRequest(request);
  return Response.json(await getSectionsByPageRequest(pageRequest));
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
