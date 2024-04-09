import { EmployeePaginationRequest } from "@/app/_models/Employee";
import {
  deleteEmployee,
  getEmployeeObjectsByPagination,
} from "@/services/Employees";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const pageRequest = EmployeePaginationRequest.fromRequest(request);
  return Response.json(await getEmployeeObjectsByPagination(pageRequest));
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteEmployee(params.id);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ message: "Employee not found" }, { status: 404 });
  }
}
