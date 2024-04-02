/** @format */

import { SectionPageRequest } from "@/app/_models/Section";
import DBclient from "@/knex/config/DBClient";
import { getSectionsByPageRequest } from "@/services/Section";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const pageRequest = SectionPageRequest.fromRequest(request);
  return Response.json(await getSectionsByPageRequest(pageRequest));
}

export async function POST(request: Request) {
  const { name, sectionType, employee_id, department_id } =
    await request.json();
  const newSection = await DBclient.table("sections").insert({
    name,
    section_type: sectionType,
    department_id,
    employee_id,
  });
  return Response.json(newSection);
}
