/** @format */

import DBclient from "@/knex/config/DBClient";

import { NextRequest } from "next/server";

import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";
import { getInternshipPositionObjectByPageRequest } from "@/services/InternshipPositionService";

export async function GET(request: NextRequest) {
  const pageRequest: InternshipPaginationRequest = {
    page: request.nextUrl.searchParams.get("page")
      ? parseInt(request.nextUrl.searchParams.get("page"))
      : 0,
    size: request.nextUrl.searchParams.get("size")
      ? parseInt(request.nextUrl.searchParams.get("size"))
      : 10,
    sort: request.nextUrl.searchParams.get("sort") as "id" | "name" | undefined,
  };
  return Response.json(
    await getInternshipPositionObjectByPageRequest(pageRequest),
  );
}

export async function POST(request: Request) {
  const {
    name,
    internship_field,
    maxCapacity,
    currentCapacity,
    numberOfBeds,
    yearOfStudy,
    section_id,
    page,
  } = await request.json();
  console.log(page);
  const internship = await DBclient("internships").insert({
    name,
    internship_field,
    maxCapacity,
    currentCapacity,
    numberOfBeds,
    yearOfStudy,
    section_id,
  });
  return Response.json(internship);
}
