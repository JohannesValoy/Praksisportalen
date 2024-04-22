/** @format */

import { fetchTimeIntervalsByInternshipID } from "@/services/TimeIntervalService";
import { TimeIntervalPageRequest } from "@/app/_models/TimeInterval";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const pageRequest = await TimeIntervalPageRequest.fromRequest(request);
    return new Response(
      JSON.stringify(await fetchTimeIntervalsByInternshipID(pageRequest)),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error fetching time interval data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch time interval data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
