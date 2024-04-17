import { EmployeePaginationRequest } from "@/app/_models/Employee";
import { NextRequest } from "next/server";
import { Role } from "../auth/[...nextauth]/nextauth";
import { getEmployeeObjectsByPagination } from "@/services/EmployeeService";

export async function GET(request: NextRequest) {
  const pageRequest: EmployeePaginationRequest = {
    page: request.nextUrl.searchParams.get("page")
      ? parseInt(request.nextUrl.searchParams.get("page"))
      : 0,
    size: request.nextUrl.searchParams.get("size")
      ? parseInt(request.nextUrl.searchParams.get("size"))
      : 10,
    sort: request.nextUrl.searchParams.get("sort") as "id" | "name" | undefined,
    containsName: request.nextUrl.searchParams.get("containsName"),
    containsEmail: request.nextUrl.searchParams.get("containsEmail"),
    hasRole: request.nextUrl.searchParams.getAll("hasRole")
      ? request.nextUrl.searchParams
          .getAll("hasRole")
          .filter((role) => role == Role.admin || role == Role.employee)
          .map((role) => role as Role)
      : undefined,
  };
  return Response.json(await getEmployeeObjectsByPagination(pageRequest));
}
