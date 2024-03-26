/** @format */

import DBclient from "@/knex/config/DBClient";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("id")?.split(",");
  const student = await DBclient.from("users").whereIn("id", query).first();
  return Response.json(student);
}
