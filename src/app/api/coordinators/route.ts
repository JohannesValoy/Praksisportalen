/** @format */

import { CoordinatorPageRequest } from "@/app/_models/Coordinator";
import { getCoordinatorsByPageRequest } from "@/services/Coordinator";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const pageRequest = CoordinatorPageRequest.fromRequest(request);
  return Response.json(await getCoordinatorsByPageRequest(pageRequest));
}
