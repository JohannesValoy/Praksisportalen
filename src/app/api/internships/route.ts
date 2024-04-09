/** @format */

import DBclient from "@/knex/config/DBClient";

import { NextRequest } from "next/server";

import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";
import { getInternshipPositionObjectByPageRequest } from "@/services/InternshipPosition";

export async function GET(request: NextRequest) {
  const pageRequest = InternshipPaginationRequest.fromRequest(request);
  return Response.json(
    await getInternshipPositionObjectByPageRequest(pageRequest)
  );
}

export async function POST(request: Request) {
  const {
    name,
    field,
    maxCapacity,
    currentCapacity,
    numberOfBeds,
    yearOfStudy,
    section_id,
  } = await request.json();
  const internship = await DBclient("internships").insert({
    name,
    internship_field: field,
    maxCapacity,
    currentCapacity,
    numberOfBeds,
    yearOfStudy,
    section_id,
  });
  return Response.json(internship);
}
