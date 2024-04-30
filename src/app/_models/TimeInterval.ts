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
  internshipAgreementID: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(query: TimeIntervalTable) {
    this.id = query.id;
    this.startDate = query.startDate;
    this.endDate = query.endDate;
    this.internshipAgreementID = query.internshipAgreementID;
    this.createdAt = query.createdAt;
    this.updatedAt = query.updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      startDate: this.startDate,
      endDate: this.endDate,
      internshipAgreementID: this.internshipAgreementID,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

/**
 * TimeIntervalPageRequest is a class that represents a request for a paginated list of TimeInterval objects.
 * It should be used when you want to get a list of TimeInterval objects from the server.
 */
export class TimeIntervalPageRequest implements PageRequest {
  internshipAgreementID: number[];
  startDate: Date;
  endDate: Date;
  page: number;
  size?: number;
  sort?: "name" | "id";

  /**
   * Creates a new TimeIntervalPageRequest object.
   * @param page the page number
   * @param size the size of the page
   * @param internshipAgreementID the id of the internship
   * @param startDate the start time of the interval
   * @param end the end time of the interval
   */
  constructor(
    page: number,
    size: number,
    internshipAgreementID: number[],
    startDate: Date,
    end: Date
  ) {
    this.page = page > 1 ? page : 1;
    this.size = size > 0 ? size : 10;
    this.sort = "name";
    this.internshipAgreementID = internshipAgreementID;
    this.startDate = startDate;
    this.endDate = end;
  }

  /**
   * Creates a new TimeIntervalPageRequest object from a NextRequest object.
   * @param request the NextRequest object
   */
  static fromRequest(request: NextRequest): TimeIntervalPageRequest {
    const internshipAgreementID = request.nextUrl.searchParams
      .getAll("internshipAgreementID")
      .map(Number);
    const start = request.nextUrl.searchParams.get("startDate");
    const startDate = start ? new Date(start) : null;
    const end = request.nextUrl.searchParams.get("endDate");
    const endDate = end ? new Date(end) : null;
    const page = request.nextUrl.searchParams.get("page")
      ? Number(request.nextUrl.searchParams.get("page"))
      : 1;
    const size = request.nextUrl.searchParams.get("size")
      ? Number(request.nextUrl.searchParams.get("size"))
      : 10;
    return new TimeIntervalPageRequest(
      page,
      size,
      internshipAgreementID,
      startDate,
      endDate
    );
  }
}

export default TimeIntervalObject;
