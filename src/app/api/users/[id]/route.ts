/** @format */

import DBclient from "@/knex/config/DBClient";

import { NextRequest } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  const user = await DBclient("users").where({ id: params.id }).first();
  if (user) {
    return Response.json(user);
  }
  return Response.json({ message: "User not found" }, { status: 404 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } },
) {
  const user = await DBclient("users").where({ id: params.id }).delete();
  return Response.json({ success: true });
}
