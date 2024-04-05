/** @format */

import DBclient from "@/knex/config/DBClient";

import { PageResponse, UserPageRequest } from "@/app/_models/pageinition";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const pageRequest = UserPageRequest.fromRequest(request);
  const internships = await DBclient.from("internships")
    .select("*")
    .orderBy(pageRequest.sort);
  return Response.json(new PageResponse(pageRequest, internships));
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
