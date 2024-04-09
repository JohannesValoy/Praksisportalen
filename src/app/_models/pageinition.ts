/** @format */

import { NextRequest } from "next/server";
/**
 * PageRequest is a class that represents a request for a paginated list of objects.
 * It should be used when you want to get a list of objects from the server.
 */
export class PageRequest {
  page: number;
  size: number;
  sort: string;

  /**
   * Creates a new PageRequest object.
   * @param page @default 0 The page number
   * @param size @default 10 The size of the page
   */
  constructor(page: number = 0, size: number = 10) {
    if (page < 0) {
      page = 0;
    }
    if (size < 1) {
      size = 10;
    }
    this.page = page;
    this.size = size;
    this.sort = "id";
  }

  static fromRequest(request: NextRequest): PageRequest {
    const page = request.nextUrl.searchParams.get("page")
      ? parseInt(request.nextUrl.searchParams.get("page"))
      : 0;
    const size = request.nextUrl.searchParams.get("size")
      ? parseInt(request.nextUrl.searchParams.get("size"))
      : 10;
    const sort = request.nextUrl.searchParams.get("sort");
    return new PageRequest(page, size);
  }
}

/**
 * PageResponse is a class that represents a response for a paginated list of objects.
 */
export class PageResponse<T> extends PageRequest {
  elements: T[];
  totalElements: number;
  totalPages: number;

  /**
   * Creates a new PageResponse object.
   * @param PageRequest The request object that contains the page, size, and sort.
   * @param elements  The list of elements.
   * @param totalElements  The total number of elements.
   */
  constructor(PageRequest: PageRequest, elements: T[], totalElements: number) {
    super(PageRequest.page, PageRequest.size);
    this.sort = PageRequest.sort;
    this.elements = elements;
    this.totalElements = totalElements;
    this.totalPages = Math.ceil(this.totalElements / this.size);
  }
}

/**
 * UserPageRequest is a class that represents a request for a paginated list of User objects.
 * It should be used when you want to get a list of User objects from the server.
 */
export class UserPageRequest extends PageRequest {
  roles: string[];

  /**
   * Creates a new UserPageRequest object.
   * @param page the page number
   * @param size the size of the page
   * @param sort  the sort order
   * @param roles  the roles of the users
   */
  constructor(page: number, size: number, sort: string, roles: string[]) {
    super(page, size);
    if (["name", "email", "role"].includes(sort)) {
      this.sort = sort;
    }
    if (
      roles.length === 0 &&
      roles.every(
        (role) =>
          ["admin", "employee", "coordinator", "student"].indexOf(role) === -1,
      )
    ) {
      roles = ["admin", "employee", "coordinator", "student"];
    }
    this.roles = roles;
  }
  /**
   * Creates a new UserPageRequest object from a NextRequest object.
   * @param request  The request object that contains the parameters to search after.
   * @returns A new UserPageRequest object.
   */
  static fromRequest(request: NextRequest) {
    const page = super.fromRequest(request);
    let roles = request.nextUrl.searchParams.get("role")
      ? request.nextUrl.searchParams.get("role").split(",")
      : [];
    return new UserPageRequest(page.page, page.size, page.sort, roles);
  }

  /**
   * A default UserPageRequest object.
   * @returns A new UserPageRequest object.
   */
  static default(): UserPageRequest {
    return new UserPageRequest(0, 10, "id", [
      "admin",
      "employee",
      "coordinator",
      "student",
    ]);
  }
}
