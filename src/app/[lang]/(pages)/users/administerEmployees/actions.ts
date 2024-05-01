"use server";
import { EmployeePaginationRequest } from "@/app/_models/Employee";
import {
  getEmployeeObjectsByPagination,
  deleteEmployee,
} from "@/services/EmployeeService";
import "server-only";
/**
 * Paginates a list of {@link Employee} objects.
 * @param request The {@link EmployeePaginationRequest} object.
 * @returns A {@link PageResponse} object containing the list of {@link Employee} objects.
 */
export async function paginateEmployees(request: EmployeePaginationRequest) {
  return await getEmployeeObjectsByPagination(request);
}

/**
 * Deletes an Employee by its ID.
 * @param id  The ID of the Employee to delete.
 * @returns  The total number of Employees deleted.
 */
export async function deleteEmployeeByID(id: string) {
  return await deleteEmployee(id);
}
