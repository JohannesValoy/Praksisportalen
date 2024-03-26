/** @format */

import DBclient from "@/knex/config/DBClient";
import InternshipJson from "../InternshipView";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const internship = await DBclient("internships")
    .where({ section_id: params.id })
    .select("*");
  if (internship) {
    return Response.json(new InternshipJson(internship[0]));
  }
  return Response.json({ message: "Internship not found" }, { status: 404 });
}
