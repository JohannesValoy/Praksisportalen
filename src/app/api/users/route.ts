/** @format */
import DBclient from "@/knex/config/DBClient";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("role")?.split(",") || [
    "student",
    "employee",
    "coordinator",
    "admin",
  ];
  const users = await DBclient.from("users").whereIn("role", query).select("*");
  return Response.json(users);
}
