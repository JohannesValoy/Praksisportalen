/** @format */

import DBclient from "@/knex/config/DBClient";

export async function GET(request: Request) {
  const internships = await DBclient.from("internships").select("*");
  return Response.json(internships);
}
debugger;
console.log("test");
export async function POST(request: Request) {
  const {
    name,
    maxCapacity,
    currentCapacity,
    numberOfBeds,
    yearOfStudy,
    section_id,
  } = await request.json();
  console.log(request);
  const internship = await DBclient("internships").insert({
    name,
    field: "field",
    maxCapacity,
    currentCapacity,
    numberOfBeds,
    yearOfStudy,
    section_id,
  });
  return Response.json(internship);
}
