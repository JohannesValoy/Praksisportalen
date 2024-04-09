import { EmployeePaginationRequest } from "@/app/_models/Employee";
import { getEmployeeObjectsByPagination } from "@/services/Employees";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const pageRequest = EmployeePaginationRequest.fromRequest(request);
  return Response.json(await getEmployeeObjectsByPagination(pageRequest));
}
