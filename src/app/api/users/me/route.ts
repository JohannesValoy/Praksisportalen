/** @format */
import { NextRequest } from "next/server";
import { getUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await getUser();
  if (user) {
    return Response.json(user);
  } else {
    return new Response("Unauthorized", { status: 401 });
  }
}
