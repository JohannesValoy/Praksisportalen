/** @format */

import { InternshipAgreementTable } from "knex/types/tables.js";
import StudyProgramObject from "./StudyProgram";
import InternshipPositionObject from "./InternshipPosition";
import { PageRequest } from "./pageinition";
import { NextRequest } from "next/server";

/**
 * A class representing an Internship Agreement.
 */
class InternshipAgreementObject implements InternshipAgreementTable {
  id: number;
  status: string;
  startDate: Date;
  endDate: Date;
  student_id: string;
  internship_id: number;
  studyProgram_id: number;
  studyProgram: StudyProgramObject;
  internship: InternshipPositionObject;
  comment: string;
  created_at: Date;
  updated_at: Date;
  coordinator_id: string;

  /**
   * Constructs a new Internship Agreement object.
   * @param agreement The raw agreement data from the database.
   * @param studyProgram An object representing the associated study program.
   * @param internship An object representing the associated internship position.
   */
  constructor(
    agreement: InternshipAgreementTable,
    studyProgram: StudyProgramObject,
    internship: InternshipPositionObject
  ) {
    this.id = agreement.id;
    this.status = agreement.status;
    this.startDate = agreement.startDate;
    this.endDate = agreement.endDate;
    this.student_id = agreement.student_id;
    this.internship_id = agreement.internship_id;
    this.studyProgram_id = agreement.studyProgram_id;
    this.studyProgram = studyProgram;
    this.internship = internship;
    this.comment = agreement.comment;
    this.created_at = agreement.created_at;
    this.updated_at = agreement.updated_at;
    this.coordinator_id = agreement.coordinator_id;
  }

  /**
   * Converts the agreement object to a JSON representation.
   * @returns A JSON object representing the agreement.
   */
  toJSON() {
    return {
      id: this.id,
      status: this.status,
      startDate: this.startDate,
      endDate: this.endDate,
      student_id: this.student_id,
      internship_id: this.internship_id,
      studyProgram_id: this.studyProgram_id,
      studyProgram: this.studyProgram,
      internship: this.internship,
      comment: this.comment,
      created_at: this.created_at,
      updated_at: this.updated_at,
      coordinator_id: this.coordinator_id,
    };
  }
}

/**
 * InternshipAgreementPageRequest is a class that represents a request for a paginated list of Internship Agreement objects.
 * It should be used when you want to get a list of Internship Agreements from the server.
 */
export class InternshipAgreementPageRequest extends PageRequest {
  private _hasCoordinatorID: number;
  private _hasStudentID: number;
  private _hasInternshipID: number;
  private _containsComment: string;
  private _containsStudyProgramID: number;
  private _containsStatus: string;

  /**
   * Creates a new InternshipAgreementPageRequest object.
   * @param page page number
   * @param size of the page
   * @param sort what to sort by
   * @param filters Additional filter parameters.
   */
  constructor(
    page: number,
    size: number,
    sort: string,
    hasCoordinatorID: number,
    hasStudentID: number,
    hasInternshipID: number,
    containsComment: string,
    containsStudyProgramID: number,
    containsStatus: string
  ) {
    super(page, size);
    if (
      [
        "status",
        "startDate",
        "endDate",
        "student_id",
        "coordinator_id",
        "studyProgram_id",
        "internship_id",
        "comment",
        "created_at",
        "updated_at",
      ].includes(sort)
    ) {
      this.sort = sort;
    }
    this._hasCoordinatorID = hasCoordinatorID;
    this._hasStudentID = hasStudentID;
    this._hasInternshipID = hasInternshipID;
    this._containsComment = containsComment;
    this._containsStudyProgramID = containsStudyProgramID;
    this._containsStatus = containsStatus;
  }

  /**
   * Creates a new InternshipAgreementPageRequest object from a NextRequest object, parsing URL search parameters.
   * @param request The incoming NextRequest object.
   * @returns A configured page request object.
   */
  static fromRequest(request: NextRequest): InternshipAgreementPageRequest {
    const pageRequest = super.fromRequest(request);
    const params = request.nextUrl.searchParams;
    return new InternshipAgreementPageRequest(
      pageRequest.page,
      pageRequest.size,
      params.get("sort") || "",
      Number(params.get("hasCoordinatorID")) || -1,
      Number(params.get("hasStudentID")) || -1,
      Number(params.get("hasInternshipID")) || -1,
      params.get("containsComment") || "",
      Number(params.get("containsStudyProgramID")) || -1,
      params.get("containsStatus") || ""
    );
  }

  // Getters for private fields with filters
  get hasCoordinatorID(): number {
    return this._hasCoordinatorID;
  }

  get hasStudentID(): number {
    return this._hasStudentID;
  }

  get hasInternshipID(): number {
    return this._hasInternshipID;
  }

  get containsComment(): string {
    return this._containsComment;
  }

  get containsStudyProgramID(): number {
    return this._containsStudyProgramID;
  }

  get containsStatus(): string {
    return this._containsStatus;
  }

  toJSON() {
    return {
      page: this.page,
      size: this.size,
      sort: this.sort,
      hasCoordinatorID: this._hasCoordinatorID,
      hasStudentID: this._hasStudentID,
      hasInternshipID: this._hasInternshipID,
      containsComment: this._containsComment,
      containsStudyProgramID: this._containsStudyProgramID,
      containsStatus: this._containsStatus,
    };
  }
}

export default InternshipAgreementObject;
