/** @format */
import { PageResponse, UserPageRequest } from "@/app/_models/pageinition";
import DBclient from "@/knex/config/DBClient";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const pageRequest = UserPageRequest.fromRequest(request);
  const users = await DBclient.from("users")
    .select("*")
    .whereIn("role", pageRequest.roles)
    .orderBy(pageRequest.sort);
  return Response.json(new PageResponse(pageRequest, users));
}
