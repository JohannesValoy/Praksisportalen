/** @format */

import DBclient from "@/knex/config/DBClient";
import SectionView from "../SectionView";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const section = await DBclient("sections")
    .where({ "sections.department_id": params.id })
    .join("users", "sections.employee_id", "=", "users.id")
    .select("sections.*", "users.email as employee_email");
  if (section) {
    return Response.json(section.map((sec) => new SectionView(sec)));
  }
  return Response.json({ message: "Internship not found" }, { status: 404 });
}
