/** @format */

import { NextRequest } from "next/server";
import { Role } from "../api/auth/[...nextauth]/nextauth";

/**
 * PageRequest is a class that represents a request for a paginated list of objects.
 * It should be used when you want to get a list of objects from the server.
 */
export interface PageRequest {
  page?: number;
  size?: number;
  sort?: string;
}

/**
 * PageResponse is a class that represents a response for a paginated list of objects.
 */
export interface PageResponse<T> extends PageRequest {
  elements: T[];
  totalElements: number;
  totalPages: number;
}

/**
 * UserPageRequest is a class that represents a request for a paginated list of User objects.
 * It should be used when you want to get a list of User objects from the server.
 */
export interface UserPageRequest extends PageRequest {
  roles?: Role[];
}

/**
 * Converts from a {@link NextRequest} to a {@link PageRequest}
 * @param request The {@link NextRequest} to convert.
 * @returns A new {@link PageRequest} object.
 */
export function fromRequestToPage(request: NextRequest) {
  const pageRequest: PageRequest = {
    page: request.nextUrl.searchParams.get("page")
      ? parseInt(request.nextUrl.searchParams.get("page"))
      : 0,
    size: request.nextUrl.searchParams.get("size")
      ? parseInt(request.nextUrl.searchParams.get("size"))
      : 10,
    sort: request.nextUrl.searchParams.get("sort") as "id" | "name" | undefined,
  };

  return pageRequest;
}
