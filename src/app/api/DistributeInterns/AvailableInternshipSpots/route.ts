/** @format */
import DBclient from "@/knex/config/DBClient";
import { NextRequest } from "next/server";
//FIXME: This code can't be built without the following variables. Find out why
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function GET(request: NextRequest) {
  const internshipAgreements = await DBclient("internships")
    .where(
      "internships.currentCapacity",
      "<",
      DBclient("students")
        .count("*")
        .whereRaw("students.internship_id = internships.id")
    )
    .select("*");

  return Response.json(internshipAgreements);
}
