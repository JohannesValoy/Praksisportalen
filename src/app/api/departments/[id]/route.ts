/** @format */

import DBclient from "@/knex/config/DBClient";
import { NextRequest } from "next/server";
import { getDepartmentObjectByID } from "@/services/Department";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const department = await getDepartmentObjectByID(params.id)
    return Response.json(department);
  } catch (error) {
    return Response.json({ message: "Department not found" }, { status: 404 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const department = await DBclient("departments")
    .where({ id: params.id })
    .delete();
  return Response.json({ success: true });
}
