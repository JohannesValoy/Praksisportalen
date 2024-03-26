/** @format */

import DBClient from "@/knex/config/DBClient";
import SectionJson from "../SectionView";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  // Fetch the section along with the user's email who is referred by employee_id
  const sectionWithUserEmail = await DBClient.table("sections")
    .where({ "sections.department_id": params.id })
    .join("users", "sections.employee_id", "=", "users.id")
    .select("sections.*", "users.email as employee_email") // Selecting all from sections and user's email
    .first(); // Assuming you're looking for a single section

  if (sectionWithUserEmail) {
    return Response.json(new SectionJson(sectionWithUserEmail));
  }
  return Response.json({ message: "User not found" }, { status: 404 });
}
