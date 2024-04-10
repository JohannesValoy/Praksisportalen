import { CoordinatorTable } from "knex/types/tables.js";
import { PageRequest } from "./pageinition";
import { NextRequest } from "next/server";

class Coordinator implements CoordinatorTable {
  id?: string;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(query: CoordinatorTable) {
    this.id = query.id;
    this.name = query.name;
    this.email = query.email;
    this.password = query.password;
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

class CoordinatorPageRequest extends PageRequest {
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
    const base = super.fromRequest(request);
    const name = request.nextUrl.searchParams.get("name");
    const email = request.nextUrl.searchParams.get("email");
    const sort = request.nextUrl.searchParams.get("sort");
    return new CoordinatorPageRequest(base.page, base.size, sort, name, email);
  }
}

export { Coordinator, CoordinatorPageRequest };
