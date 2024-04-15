/** @format */

import DBclient from "@/knex/config/DBClient";

import { NextRequest } from "next/server";

import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";
import { getInternshipPositionObjectByPageRequest } from "@/services/InternshipPosition";

export async function GET(request: NextRequest) {
  const pageRequest = InternshipPaginationRequest.fromRequest(request);
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
  } = await request.json();
  console.log(
    "-----------------------------------------------------------",
    "name: " + name,
    "internship_field: " + internship_field,
    "maxCapacity: " + maxCapacity,
    "currentCapacity: " + currentCapacity,
    "numberOfBeds: " + numberOfBeds,
    "yearOfStudy: " + yearOfStudy,
    "section_id: " + section_id,
    "-----------------------------------------------------------",
    request.json(),
  );
  const internship = await DBclient("internships").insert({
    name,
    internship_field,
    maxCapacity,
    currentCapacity,
    numberOfBeds,
    yearOfStudy,
    section_id,
  });
  console.log(internship);
  console.log("Internship created");
  console.log(request);
  return Response.json(internship);
}
