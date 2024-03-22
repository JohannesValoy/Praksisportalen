/** @format */

import { cookies } from "next/headers";

export async function GET(request: Request, { id }: { id: string }) {
  if (id === "me") {
    const cookiteStore = cookies();
    const token = cookiteStore.get("token");
  }
}
