/** @format */
import DBclient from "@/knex/config/DBClient";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(request: NextRequest) {
  const internshipAgreements = await DBclient("internships")
    .leftJoin("students", "internships.id", "students.internship_id")
    .select("internships.*")
    .count("students.id as studentCount")
    .groupBy("internships.id")
    .then((rows) => {
      return rows.map((row) => ({
        ...row,
        availablePlaces: row.currentCapacity - row.studentCount,
      }));
    });
  console.log(internshipAgreements);
  return Response.json(internshipAgreements);
}
