/** @format */

import { NextRequest } from "next/server";

export class PageRequest {
  page: number;
  size: number;
  sort: string;

  constructor(page: number = 0, size: number = 10, sort: string = "id") {
    if (page < 0) {
      page = 0;
    }
    if (size < 1) {
      size = 10;
    }
    this.page = page;
    this.size = size;
    this.sort = sort;
  }

  static fromRequest(request: NextRequest): PageRequest {
    const page = request.nextUrl.searchParams.get("page")
      ? parseInt(request.nextUrl.searchParams.get("page"))
      : 0;
    const size = request.nextUrl.searchParams.get("size")
      ? parseInt(request.nextUrl.searchParams.get("size"))
      : 10;
    const sort = request.nextUrl.searchParams.get("sort");
    return new PageRequest(page, size, sort);
  }
}

export class PageResponse extends PageRequest {
  elements: any[];
  totalElements: number;
  totalPages: number;

  constructor(PageRequest: PageRequest, elements: any[]) {
    super(PageRequest.page, PageRequest.size, PageRequest.sort);
    this.elements = elements.slice(
      this.page * this.size,
      this.page * this.size + this.size
    );
    this.totalElements = elements.length;
    this.totalPages = Math.ceil(this.totalElements / this.size);
  }
}

export class UserPageRequest extends PageRequest {
  roles: string[];

  constructor(page: number, size: number, sort: string, roles: string[]) {
    if (["id", "name", "email", "role"].indexOf(sort) === -1) {
      sort = "id";
    }
    super(page, size, sort);
    if (
      roles.length === 0 &&
      roles.every(
        (role) =>
          ["admin", "employee", "coordinator", "student"].indexOf(role) === -1
      )
    ) {
      roles = ["admin", "employee", "coordinator", "student"];
    }
    this.roles = roles;
  }

  static fromRequest(request: NextRequest) {
    const page = super.fromRequest(request);
    let roles = request.nextUrl.searchParams.get("role")
      ? request.nextUrl.searchParams.get("role").split(",")
      : [];
    return new UserPageRequest(page.page, page.size, page.sort, roles);
  }

  static default(): UserPageRequest {
    return new UserPageRequest(0, 10, "id", [
      "admin",
      "employee",
      "coordinator",
      "student",
    ]);
  }
}
