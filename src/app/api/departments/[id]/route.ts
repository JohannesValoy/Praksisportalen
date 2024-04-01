/** @format */

import DBclient from "@/knex/config/DBClient";
import DepartmentJson from "../DepartmentView";
import { NextRequest } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const department = await DBclient("departments")
    .where({ id: params.id })
    .first();
  if (department) {
    return Response.json(new DepartmentJson(department));
  }
  return Response.json({ message: "Department not found" }, { status: 404 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  const department = await DBclient("departments")
    .where({ id: params.id })
    .delete();
  console.log(department);
  return Response.json({ success: true });
}
