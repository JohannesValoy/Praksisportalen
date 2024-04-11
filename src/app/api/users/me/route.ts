/** @format */
import { NextRequest } from "next/server";
import { getUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await getUser();
  if (user) {
    return { status: 200, body: user };
  } else {
    return { status: 401, body: { message: "Unauthorized" } };
  }
}
