/** @format */

import DBClient from "@/knex/config/DBClient"; // Ensure correct import path
import { NextRequest } from "next/server"; // Ensure Response is correctly imported
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("department_id")?.split(",");

  try {
    const sections = await DBClient.table("sections")
      .whereIn("department_id", query)
      .join("users", "sections.employee_id", "=", "users.id")
      .select(
        "sections.*",
        "users.email as employee_email" // Selecting the employee's email and any other details you need
      );

    return new Response(JSON.stringify(sections), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching section data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch section data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
