/** @format */

"use server";
import { EmployeePaginationRequest } from "@/app/_models/Employee";
import {
  getEmployeeObjectsByPagination,
  deleteEmployee,
} from "@/services/EmployeeService";
import "server-only";

export async function paginateEmployees(request: EmployeePaginationRequest) {
  return await getEmployeeObjectsByPagination(request);
}

export async function deleteEmployeeByID(id: string) {
  return await deleteEmployee(id);
}
