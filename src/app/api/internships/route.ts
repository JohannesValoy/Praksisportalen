/** @format */

import DBclient from "@/knex/config/DBClient";

import { NextRequest } from "next/server";
import { getInternshipPositionObjectByPageRequest } from "@/services/InternshipPosition";
import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";

import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";
import { getInternshipPositionObjectByPageRequest } from "@/services/InternshipPosition";

export async function GET(request: NextRequest) {
  try {
    const pageRequest = InternshipPaginationRequest.fromRequest(request);
    return new Response(
      JSON.stringify(
        await getInternshipPositionObjectByPageRequest(pageRequest)
      ),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
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

export async function POST(request: Request) {
  const { name, employee_id } = await request.json();
  const newInternship = await DBclient.table("internships").insert({
    name,
    employee_id,
  });
  return Response.json(newInternship);
}
