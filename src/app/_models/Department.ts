/** @format */

import { Department } from "knex/types/tables.js";
import EmployeeObject from "./Employee";
import { PageRequest } from "./pageinition";
import { NextRequest } from "next/server";
/**
 * A class representing a Department
 */
class DepartmentObject implements Department {
  id: number;
  name: string;
  employee_id: number;
  employee: EmployeeObject;
  created_at: Date;
  updated_at: Date;
  /**
   * Creates an instance of Department.
   * @param query from the database
   * @param employee the employee object from employee_id
   */
  constructor(query: Department, employee: EmployeeObject) {
    this.id = query.id;
    this.name = query.name;
    this.employee_id = query.employee_id;
    this.employee = employee;
    this.created_at = query.created_at;
    this.updated_at = query.updated_at;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      employee: this.employee,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

/**
 * DepartmentPageRequest is a class that represents a request for a paginated list of Department objects.
 * It should be used when you want to get a list of Department objects from the server.
 */
export class DepartmentPageRequest extends PageRequest {
  private _hasEmployeeID: number;
  private _hasSectionID: number;
  private _containsName: string;
  /**
   * Creates a new DepartmentPageRequest object.
   * @param page page number
   * @param size the size of the page
   * @param sort what to sort by
   * @param hasEmployeeID id of the employee
   * @param hasSectionID id of the section
   * @param containsName name of the department
   */
  constructor(
    page: number,
    size: number,
    sort: string = "departments.name",
    hasEmployeeID: number,
    hasSectionID: number,
    containsName: string
  ) {
    super(page, size);
    if (
      [
        "departments.name",
        "employees.email",
        "created_at",
        "updated_at",
      ].includes(sort)
    ) {
      this.sort = sort;
    } else {
      this.sort = "departments.id";
    }
    this._hasEmployeeID = hasEmployeeID;
    this._hasSectionID = hasSectionID;
    this._containsName = containsName;
  }
  /**
   * From a NextRequest object, create a DepartmentPageRequest object.
   * @param request NextRequest object
   * @returns  DepartmentPageRequest based on the request
   */
  static fromRequest(request: NextRequest): DepartmentPageRequest {
    const pageRequest = super.fromRequest(request);
    const hasEmployeeID = request.nextUrl.searchParams.get("leaderID")
      ? parseInt(request.nextUrl.searchParams.get("leaderID"))
      : -1;
    const hasSectionID = request.nextUrl.searchParams.get("hasSectionID")
      ? parseInt(request.nextUrl.searchParams.get("hasSectionID"))
      : -1;
    const containsName = request.nextUrl.searchParams.get("containsName")
      ? request.nextUrl.searchParams.get("containsName")
      : "";
    const sort = request.nextUrl.searchParams.get("sort");
    return new DepartmentPageRequest(
      pageRequest.page,
      pageRequest.size,
      sort,
      hasEmployeeID,
      hasSectionID,
      containsName
    );
  }
  /**
   * Get the employee id
   */
  public get hasEmployeeID(): number {
    return this._hasEmployeeID;
  }
  /**
   * Get the section id
   */
  public get hasSectionID(): number {
    return this._hasSectionID;
  }
  /**
   * Get the name of the department
   */
  public get containsName(): string {
    return this._containsName;
  }
}

export default DepartmentObject;
