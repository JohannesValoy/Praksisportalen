/** @format */

import DBclient from "@/knex/config/DBClient";
import { NextRequest } from "next/server";

export async function GET(request: Request) {
  const sections = await DBclient.from("sections").select("*");
  return Response.json(sections);
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
