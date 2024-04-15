/** @format */
import { NextRequest } from "next/server";
import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";
import { getInternshipAgreementsByInternshipRequest } from "@/services/Agreement";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(request: NextRequest) {
  const internshipRequest = InternshipPaginationRequest.fromRequest(request); // Assuming a method to parse request similar to SectionPageRequest
  console.log("request: " + JSON.stringify(request));
  console.log(
    "Api/AvailableInternshipSpots: internshipRequest: " +
      JSON.stringify(internshipRequest),
  );
  console.log(
    "Api/AvailableInternshipSpots: internshipRequest.Field: " +
      internshipRequest.getField(),
  );
  console.log(
    "Api/AvailableInternshipSpots: getInternshipAgreementsByInternshipRequest: " +
      JSON.stringify(
        getInternshipAgreementsByInternshipRequest(internshipRequest),
      ),
  );
  return Response.json(
    await getInternshipAgreementsByInternshipRequest(internshipRequest),
  );
}
