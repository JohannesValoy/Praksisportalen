/** @format */

import DBclient from "@/knex/config/DBClient";

export async function GET(request: Request) {
  const internships = await DBclient.from("internships").select("*");
  return Response.json(internships);
}

export async function POST(request: Request) {
  const {
    name,
    field,
    currentCapacity,
    numberOfBeds,
    yearOfStudy,
    section_id,
  } = await request.json();
  const internship = await DBclient("internships").insert({
    name,
    field,
    currentCapacity,
    numberOfBeds,
    yearOfStudy,
    section_id,
  });
  return Response.json(internship);
}
