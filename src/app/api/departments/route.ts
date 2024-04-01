/** @format */

import DBClient from "@/knex/config/DBClient";

export async function GET(request: Request) {
  try {
    const departments = await DBClient.table("departments")
      .join("users", "departments.employee_id", "=", "users.id")
      .select(
        "departments.*",
        "users.email as employee_email" // Selecting the employee's email and any other details you need
      );
    return new Response(JSON.stringify(departments), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching department data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch department data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request: Request) {
  const { name, employee_id } = await request.json();
  const newDepartment = await DBClient.table("departments").insert({
    name,
    employee_id,
  });
  return Response.json(newDepartment);
}
