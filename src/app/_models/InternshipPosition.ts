/** @format */

import { NextRequest } from "next/server";
import { PageRequest } from "./pageinition";
import { InternshipTable } from "knex/types/tables.js";
/**
 * InternshipPositionObject is a class that represents an Internship object.
 */
class InternshipPositionObject implements InternshipTable {
  id: number;
  name: string;
  internship_field: string;
  maxCapacity: number;
  currentCapacity: number;
  numberOfBeds: number;
  yearOfStudy: number;
  section_id: number;
  created_at: Date;
  updated_at: Date;

  constructor(query: InternshipTable) {
    this.id = query.id;
    this.name = query.name;
    this.internship_field = query.internship_field;
    this.maxCapacity = query.maxCapacity;
    this.currentCapacity = query.currentCapacity;
    this.numberOfBeds = query.numberOfBeds;
    this.yearOfStudy = query.yearOfStudy;
    this.section_id = query.section_id;
    this.created_at = query.created_at;
    this.updated_at = query.updated_at;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      maxCapacity: this.maxCapacity,
      internship_field: this.internship_field,
      currentCapacity: this.currentCapacity,
      numberOfBeds: this.numberOfBeds,
      yearOfStudy: this.yearOfStudy,
      section_id: this.section_id,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

/**
 * InternshipPaginationRequest is a class that represents a request for a paginated list of Internship objects.
 * It should be used when you want to get a list of Internship objects from the server.
 */
export class InternshipPaginationRequest extends PageRequest {
  section_id: number[];
  yearOfStudy: number[];
  _internship_field: string;

  /**
   * Creates a new InternshipPaginationRequest object.
   * @param page the page number
   * @param size the size of the page
   * @param sort the sort order
   * @param section_id  id's of the sections
   * @param yearOfStudy the year of study's
   * @param internship_field  the field of study
   */
  constructor(
    page: number = 0,
    size: number = 10,
    sort: string = "id",
    section_id: number[] = [],
    yearOfStudy: number[] = [],
    internship_field: string = "all"
  ) {
    super(page, size);
    this.section_id = section_id;
    this.yearOfStudy = yearOfStudy;
    this._internship_field = internship_field;
  }

  /**
   * Creates a new InternshipPaginationRequest object from a NextRequest object.
   * @param request the NextRequest object
   * @returns a new InternshipPaginationRequest object
   */
  static fromRequest(request: NextRequest): InternshipPaginationRequest {
    const page = super.fromRequest(request);
    const section_id = request.nextUrl.searchParams.get("section_id")
      ? request.nextUrl.searchParams
          .get("section_id")
          .split(",")
          .map((id) => parseInt(id))
      : null;
    const yearOfStudy = request.nextUrl.searchParams.get("yearOfStudy")
      ? request.nextUrl.searchParams
          .get("yearOfStudy")
          .split(",")
          .map((year) => parseInt(year))
      : null;
    const internship_field =
      request.nextUrl.searchParams.get("internship_field");
    return new InternshipPaginationRequest(
      page.page,
      page.size,
      page.sort,
      section_id,
      yearOfStudy,
      internship_field
    );
  }

  /**
   * Returns the section_id.
   */
  getSectionID(): number[] {
    return this.section_id;
  }

  /**
   * Returns the yearOfStudy.
   */
  getYearOfStudy(): number[] {
    return this.yearOfStudy;
  }

  /**
   * Returns the field.
   */
  getField(): string {
    console.log(this._internship_field);
    return this._internship_field;
  }

  /**
   * Returns the page.
   */
  getPage(): number {
    return this.page;
  }

  /**
   * Returns the size.
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Returns the sort.
   */

  getSort(): string {
    return this.sort;
  }
}

export default InternshipPositionObject;
