/** @format */

import { DepartmentPageRequest } from "@/app/_models/Department";
import DBClient from "@/knex/config/DBClient";
import { getDepartmentPageByPageRequest } from "@/services/DepartmentService";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const pageRequest: DepartmentPageRequest = {
      page: request.nextUrl.searchParams.get("page")
        ? parseInt(request.nextUrl.searchParams.get("page"))
        : 0,
      size: request.nextUrl.searchParams.get("size")
        ? parseInt(request.nextUrl.searchParams.get("size"))
        : 10,
      sort: request.nextUrl.searchParams.get("sort") as
        | "id"
        | "name"
        | undefined,
      containsName: request.nextUrl.searchParams.get("containsName"),
      hasEmployeeID: request.nextUrl.searchParams.get("hasEmployeeID")
        ? parseInt(request.nextUrl.searchParams.get("hasEmployeeID"))
        : undefined,
      hasSectionID: request.nextUrl.searchParams.get("hasSectionID")
        ? parseInt(request.nextUrl.searchParams.get("hasSectionID"))
        : undefined,
    };
    return new Response(
      JSON.stringify(await getDepartmentPageByPageRequest(pageRequest)),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error fetching department data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch department data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
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
