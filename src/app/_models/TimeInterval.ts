/** @format */

import { NextRequest } from "next/server";
import { PageRequest } from "./pageinition";
import { TimeIntervalTable } from "knex/types/tables.js";

/**
 * TimeIntervalObject is a class that represents an TimeInterval object.
 */

class TimeIntervalObject implements TimeIntervalTable {
  id: number;
  startDate: Date;
  endDate: Date;
  internshipAgreement_id: number;
  created_at: Date;
  updated_at: Date;

  constructor(query: TimeIntervalTable) {
    this.id = query.id;
    this.startDate = query.startDate;
    this.endDate = query.endDate;
    this.internshipAgreement_id = query.internshipAgreement_id;
    this.created_at = query.created_at;
    this.updated_at = query.updated_at;
  }

  toJSON() {
    return {
      id: this.id,
      startDate: this.startDate,
      endDate: this.endDate,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

/**
 * TimeIntervalPageRequest is a class that represents a request for a paginated list of TimeInterval objects.
 * It should be used when you want to get a list of TimeInterval objects from the server.
 */
export class TimeIntervalPageRequest extends PageRequest {
  internshipAgreement_id: number[];
  startDate: Date;
  endDate: Date;

  /**
   * Creates a new TimeIntervalPageRequest object.
   * @param page the page number
   * @param size the size of the page
   * @param internshipAgreement_id the id of the internship
   * @param startDate the start time of the interval
   * @param end the end time of the interval
   */
  constructor(
    page: number,
    size: number,
    internshipAgreement_id: number[],
    startDate: Date,
    end: Date
  ) {
    super(page, size);
    this.internshipAgreement_id = internshipAgreement_id;
    this.startDate = startDate;
    this.endDate = end;
  }

  /**
   * Creates a new TimeIntervalPageRequest object from a NextRequest object.
   * @param request the NextRequest object
   */
  static fromRequest(request: NextRequest): TimeIntervalPageRequest {
    const page = super.fromRequest(request);
    const internshipAgreement_id = request.nextUrl.searchParams
      .getAll("internshipAgreement_id")
      .map(Number);
    const start = request.nextUrl.searchParams.get("startDate");
    const startDate = start ? new Date(start) : null;
    const end = request.nextUrl.searchParams.get("endDate");
    const endDate = end ? new Date(end) : null;
    return new TimeIntervalPageRequest(
      page.page,
      page.size,
      internshipAgreement_id,
      startDate,
      endDate
    );
  }
}

export default TimeIntervalObject;
