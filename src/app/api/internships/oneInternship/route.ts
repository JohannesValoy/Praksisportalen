/** @format */

// Importing required modules from Next.js and your DBClient from the Knex configuration
import DBClient from "@/knex/config/DBClient";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("id")?.split(",") || [];

  try {
    const internship = await DBClient.table("internships")
      .whereIn("internships.id", query)
      .join("sections", "internships.section_id", "=", "sections.id")
      .join("users", "sections.employee_id", "=", "users.id") // Changed from "employees" to "users"
      .where("users.role", "=", "employee") // Ensure the user's role is "employee"
      .select(
        "internships.*",
        "sections.name as section_name",
        "users.id as leader_id",
        "users.name as leader_name",
        "users.email as leader_email",
        "users.role as leader_role",
        "users.created_at as leader_created_at",
        "users.updated_at as leader_updated_at"
      )
      .first();

    return new Response(JSON.stringify(internship), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching internship data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch internship data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
