/** @format */

import { CoordinatorPageRequest } from "@/app/_models/Coordinator";
import { getCoordinatorsByPageRequest } from "@/services/CoordinatorService";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const pageRequest: CoordinatorPageRequest = {
    page: request.nextUrl.searchParams.get("page")
      ? parseInt(request.nextUrl.searchParams.get("page"))
      : 0,
    size: request.nextUrl.searchParams.get("size")
      ? parseInt(request.nextUrl.searchParams.get("size"))
      : 10,
    sort: request.nextUrl.searchParams.get("sort") as "id" | "name" | undefined,
  };
  return Response.json(await getCoordinatorsByPageRequest(pageRequest));
}
