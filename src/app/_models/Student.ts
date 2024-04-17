/** @format */

import { StudentTable } from "knex/types/tables.js";
import { PageRequest } from "./pageinition";
import { NextRequest } from "next/server";

class Student implements StudentTable {
  id?: string;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(query: StudentTable) {
    this.id = query.id;
    this.name = query.name;
    this.email = query.email;
    this.created_at = query.created_at;
    this.updated_at = query.updated_at;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

class StudentPageRequest extends PageRequest {
  private _name;
  private _email;

  constructor(
    page: number,
    size: number,
    sort: string = "id",
    name: string = "",
    email: string = ""
  ) {
    super(page, size);
    if (["name", "email"].includes(sort)) {
      this.sort = sort;
    }
    this._name = name;
    this._email = email;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  static fromRequest(request: NextRequest) {
    const page = super.fromRequest(request);
    let name = request.nextUrl.searchParams.get("name") ?? "";
    let email = request.nextUrl.searchParams.get("email") ?? "";
    return new StudentPageRequest(page.page, page.size, page.sort, name, email);
  }
}

export { Student, StudentPageRequest };
