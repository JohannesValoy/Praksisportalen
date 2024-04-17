/** @format */

import { SectionTable } from "knex/types/tables.js";
import { EmployeeObject } from "./Employee";
import InternshipPositionObject from "./InternshipPosition";
import { PageRequest } from "./pageinition";
import { NextRequest } from "next/server";

/**
 * A class representing a Section
 */
class SectionObject implements SectionTable {
  id: number;
  name: string;
  employee_id: string;
  section_type: string;
  employee: EmployeeObject;
  internships: InternshipPositionObject[];
  department_id: number;
  created_at: Date;
  updated_at: Date;
  /**
   * Creates an instance of Section.
   * @param query from the database
   * @param employee A employee object created from the employee_id
   * @param internships Internship objects created from the section_id
   */
  constructor(
    query: SectionTable,
    employee: EmployeeObject,
    internships: InternshipPositionObject[] = [],
  ) {
    this.id = query.id;
    this.name = query.name;
    this.section_type = query.section_type;
    this.employee_id = query.employee_id;
    this.employee = employee;
    this.department_id = query.department_id;
    this.created_at = query.created_at;
    this.updated_at = query.updated_at;
    this.internships = internships.copyWithin(0, internships.length);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.section_type,
      employee: this.employee,
      internships: this.internships,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
/**
 * SectionPageRequest is a class that represents a request for a paginated list of Section objects.
 * It should be used when you want to get a list of Section objects from the server.
 */
export class SectionPageRequest extends PageRequest {
  private _hasEmployeeID: number;
  private _hasDepartmentID: number;
  private _containsName: string;
  /**
   * Creates a new SectionPageRequest object.
   * @param page page number
   * @param size of the page
   * @param sort what to sort by
   * @param hasEmployeeID the id of the employee
   * @param hasDepartmentID has the department id
   * @param containsName if the name contains this string
   */
  constructor(
    page: number,
    size: number,
    sort: string,
    hasEmployeeID: number,
    hasDepartmentID: number,
    containsName: string,
  ) {
    super(page, size);
    if (["name", "created_at", "updated_at"].includes(sort)) {
      this.sort = sort;
    }
    this._hasEmployeeID = hasEmployeeID;
    this._hasDepartmentID = hasDepartmentID;
    this._containsName = containsName;
  }

  /**
   * Creates a new SectionPageRequest object from a NextRequest object.
   * @param request NextRequest object
   * @returns A new SectionPageRequest object.
   */
  static fromRequest(request: NextRequest): SectionPageRequest {
    const pageRequest = super.fromRequest(request);
    const hasEmployeeID = request.nextUrl.searchParams.get("leaderID")
      ? parseInt(request.nextUrl.searchParams.get("leaderID"))
      : -1;
    const hasDepartmentID = request.nextUrl.searchParams.get("hasDepartmentID")
      ? parseInt(request.nextUrl.searchParams.get("hasDepartmentID"))
      : -1;
    const containsName = request.nextUrl.searchParams.get("containsName")
      ? request.nextUrl.searchParams.get("containsName")
      : "";
    const sort = request.nextUrl.searchParams.get("sort");
    return new SectionPageRequest(
      pageRequest.page,
      pageRequest.size,
      sort,
      hasEmployeeID,
      hasDepartmentID,
      containsName,
    );
  }
  /**
   * Gets the hasEmployeeID
   */
  get hasEmployeeID(): number {
    return this._hasEmployeeID;
  }
  /**
   * Gets the hasDepartmentID
   */
  get hasDepartmentID(): number {
    return this._hasDepartmentID;
  }
  /**
   * Gets the containsName
   */
  get containsName(): string {
    return this._containsName;
  }

  toJSON() {
    return {
      page: this.page,
      size: this.size,
      sort: this.sort,
      hasEmployeeID: this._hasEmployeeID,
      hasDepartmentID: this._hasDepartmentID,
      containsName: this._containsName,
    };
  }
}

export default SectionObject;
