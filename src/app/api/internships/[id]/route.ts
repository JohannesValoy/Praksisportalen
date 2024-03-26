/** @format */

import DBClient from "@/knex/config/DBClient";
import InternshipJson from "../InternshipView";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const internships = await DBClient("internships")
    .where("internships.section_id", params.id)
    .join("sections", "internships.section_id", "=", "sections.id")
    .join("users", "sections.employee_id", "=", "users.id")
    .select(
      "internships.*",
      "users.email as employee_email",
      "users.id as employee_id"
    );

  if (internships.length > 0) {
    return new Response(JSON.stringify(new InternshipJson(internships[0])), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ message: "Internship not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
