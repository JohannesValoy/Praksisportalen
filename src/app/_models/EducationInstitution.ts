/** @format */

import { EducationInstitutionTable } from "knex/types/tables.js";
import { PageRequest } from "./pageinition";
import { NextRequest } from "next/server";

/**
 * A class representing a EducationInstitution
 */
class EducationInstitutionObject implements EducationInstitutionTable {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  /**
   * Create an instance of EducationInstitution from a query
   * @param query from the database
   */
  constructor(query: EducationInstitutionTable) {
    this.id = query.id;
    this.name = query.name;
    this.created_at = query.created_at;
    this.updated_at = query.updated_at;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export class EducationInstitutionPageRequest extends PageRequest {
  containsName: string;
  /**
   * Creates a new EducationInstitutionPageRequest object.
   * @param page the page number
   * @param size the size of the page
   * @param containsName the name of the EducationInstitution
   */

  constructor(page: number, size: number, containsName: string, sort: string) {
    super(page, size);
    if (["name", "created_at", "updated_at"].includes(sort)) {
      this.sort = sort;
    }
    this.containsName = containsName;
  }

  /**
   * Creates a new EducationInstitutionPageRequest object from a NextRequest object.
   * @param request NextRequest object
   * @returns A new EducationInstitutionPageRequest object.
   */
  static fromRequest(request: NextRequest): EducationInstitutionPageRequest {
    const pageRequest = super.fromRequest(request);
    const containsName = request.nextUrl.searchParams.get("containsName")
      ? request.nextUrl.searchParams.get("containsName")
      : "";
    const sort = request.nextUrl.searchParams.get("sort");
    return new EducationInstitutionPageRequest(
      pageRequest.page,
      pageRequest.size,
      sort,
      containsName
    );
  }
}
export default EducationInstitutionObject;
