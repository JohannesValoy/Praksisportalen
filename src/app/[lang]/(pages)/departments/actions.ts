"use server";

import { DepartmentPageRequest } from "@/app/_models/Department";
import {
  deleteDepartmentByID,
  getDepartmentPageByPageRequest,
} from "@/services/DepartmentService";
import "server-only";

/**
 * Paginates the Departments and returns a {@link PageResponse} with a modified {@link Department}s
 * @param request The page request.
 * @returns A page response with departments.
 */
export async function paginateDepartments(request: DepartmentPageRequest) {
  const data = await getDepartmentPageByPageRequest(request);

  // If data.elements is present, map over it to create a new array
  // where each element is a flattened version of the original element.
  // If data.elements is not present, use data directly.
  const elements = data.elements.map((element) => ({
    name: element.name,
    email: element.employee.email,
    id: element.id,
  }));
  return {
    ...data,
    elements,
  };
}
/**
 * Deletes a department by its id.
 * @param id The id of the department.
 * @returns The deleted department.
 */
export async function deleteDepartment(id: number) {
  return await deleteDepartmentByID(id);
}
