/** @format */
import DBclient from "@/knex/config/DBClient";
import { NextRequest } from "next/server";
//HACK:FIXME: This code can't be built without the following variables. Find out why
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
//FIXME: Actually use pageRequest
export async function GET(request: NextRequest) {
  const internshipAgreements = await DBclient.from(
    "internshipAgreements"
  ).select("*");
  return Response.json(internshipAgreements);
}
