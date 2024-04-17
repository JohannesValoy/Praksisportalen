/** @format */
import { PageResponse, UserPageRequest } from "@/app/_models/pageinition";
import DBclient from "@/knex/config/DBClient";
import { UserAttributes } from "knex/types/tables.js";
import { NextRequest } from "next/server";

//TODO: Move over to a service / Server Action
export async function GET(request: NextRequest) {
  const pageRequest: UserPageRequest = {
    page: request.nextUrl.searchParams.get("page")
      ? parseInt(request.nextUrl.searchParams.get("page"))
      : 0,
    size: request.nextUrl.searchParams.get("size")
      ? parseInt(request.nextUrl.searchParams.get("size"))
      : 10,
    sort: request.nextUrl.searchParams.get("sort") as "id" | "name" | undefined,
    roles: request.nextUrl.searchParams.get("roles")
      ? request.nextUrl.searchParams.get("roles").split(",")
      : [],
  };
  const users = await DBclient.from("users")
    .select("*")
    .whereIn("role", pageRequest.roles)
    .orderBy(pageRequest.sort);
  return Response.json({
    ...pageRequest,
    elements: users.slice(
      pageRequest.size * pageRequest.page,
      pageRequest.size
    ),
    totalElements: users.length,
    totalPages: Math.ceil(users.length / pageRequest.size),
  } as PageResponse<UserAttributes>);
}
