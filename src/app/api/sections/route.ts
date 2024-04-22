/** @format */

import { SectionPageRequest } from "@/app/_models/Section";
import DBclient from "@/knex/config/DBClient";
import { getSectionsByPageRequest } from "@/services/SectionService";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const pageRequest: SectionPageRequest = {
    page: request.nextUrl.searchParams.get("page")
      ? parseInt(request.nextUrl.searchParams.get("page"))
      : 0,
    size: request.nextUrl.searchParams.get("size")
      ? parseInt(request.nextUrl.searchParams.get("size"))
      : 10,
    sort: request.nextUrl.searchParams.get("sort") as "id" | "name" | undefined,
    containsName: request.nextUrl.searchParams.get("containsName"),
    hasEmployeeID: request.nextUrl.searchParams.get("hasEmployeeID")
      ? parseInt(request.nextUrl.searchParams.get("hasEmployeeID"))
      : undefined,
  };
  return Response.json(await getSectionsByPageRequest(pageRequest));
}

export async function POST(request: Request) {
  const { name, section_type, employee_id, department_id } =
    await request.json();
  const newSection = await DBclient.table("sections").insert({
    name,
    section_type,
    department_id,
    employee_id,
  });
  return Response.json(newSection);
}
