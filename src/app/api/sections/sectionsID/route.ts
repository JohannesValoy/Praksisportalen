/** @format */

import DBclient from "@/knex/config/DBClient";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("department_id")?.split(",");
  const sections = await DBclient.from("sections")
    .whereIn("department_id", query)
    .select("*");
  return Response.json(sections);
}
