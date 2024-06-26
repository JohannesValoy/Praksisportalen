import {
  InternshipAgreementTable,
  InternshipTable,
  StudentTable,
} from "knex/types/tables.js";
import { PageRequest, fromRequestToPage } from "./pageinition";
import { StudyProgram } from "./StudyProgram";
import { NextRequest } from "next/server";

/**
 * A class representing an Internship Agreement.
 */
export interface InternshipAgreement extends InternshipAgreementTable {
  studyProgram: StudyProgram;
  internship: InternshipTable;
  student: StudentTable;
}

/**
 * InternshipAgreementPageRequest is a class that represents a request for a paginated list of Internship Agreement objects.
 * It should be used when you want to get a list of Internship Agreements from the server.
 */
export interface InternshipAgreementPageRequest extends PageRequest {
  hasCoordinatorID?: number;
  hasStudentID?: number;
  hasInternshipID?: number;
  containsComment?: string;
  containsStudyProgramID?: number;
  containsStatus?: string;
}
/**
 * Creates a new {@link InternshipAgreementPageRequest} based upon a {@link NextRequest}.
 * @param request The {@link NextRequest} to convert.
 * @returns A new {@link InternshipAgreementPageRequest} object.
 */
export function fromRequestToInternshipAgreementPageRequest(
  request: NextRequest,
): InternshipAgreementPageRequest {
  const baseRequest = fromRequestToPage(request);
  return {
    ...baseRequest,
    containsComment: request.nextUrl.searchParams.get("containsComment") || "",
    containsStatus: request.nextUrl.searchParams.get("containsStatus") || "",
    hasCoordinatorID: request.nextUrl.searchParams.get("hasCoordinatorID")
      ? parseInt(request.nextUrl.searchParams.get("hasCoordinatorID"))
      : 0,
    hasStudentID: request.nextUrl.searchParams.get("hasStudentID")
      ? parseInt(request.nextUrl.searchParams.get("hasStudentID"))
      : 0,
    hasInternshipID: request.nextUrl.searchParams.get("hasInternshipID")
      ? parseInt(request.nextUrl.searchParams.get("hasInternshipID"))
      : 0,
    containsStudyProgramID: request.nextUrl.searchParams.get(
      "containsStudyProgramID",
    )
      ? parseInt(request.nextUrl.searchParams.get("containsStudyProgramID"))
      : 0,
  };
}
