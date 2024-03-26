/** @format */

import DBclient from "@/knex/config/DBClient";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("section_id")?.split(",");
  const ListOfInternships = await DBclient.from("internships")
    .whereIn("section_id", query)
    .select("*");
  return Response.json(ListOfInternships);
}
