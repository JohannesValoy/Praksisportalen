/** @format */
import { NextRequest } from "next/server";
import { InternshipAgreementPageRequest } from "@/app/_models/Agreement";
import { getInternshipAgreementsByPageRequest } from "@/services/Agreement";

//FIXME: This code can't be built without the following variables. Find out why
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(request: NextRequest) {
  const pageRequest = InternshipAgreementPageRequest.fromRequest(request);
  console.log(
    pageRequest,
    "------------------------------------------------------------------------------"
  );
  return Response.json(await getInternshipAgreementsByPageRequest(pageRequest));
}
