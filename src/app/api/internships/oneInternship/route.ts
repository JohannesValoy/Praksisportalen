/** @format */

import DBclient from "@/knex/config/DBClient";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("id")?.split(",");
  const internships = await DBclient.from("internships")
    .whereIn("id", query)
    .first();
  return Response.json(internships);
}
