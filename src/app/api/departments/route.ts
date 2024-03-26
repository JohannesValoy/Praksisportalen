/** @format */

import DBclient from "@/knex/config/DBClient";

export async function GET(request: Request) {
  const departments = await DBclient.from("departments").select("*");
  return Response.json(departments);
}

export async function POST(request: Request) {
  const { name, employee_id } = await request.json();
  const newDepartment = await DBclient.table("departments").insert({
    name,
    employee_id,
  });
  return Response.json(newDepartment);
}
