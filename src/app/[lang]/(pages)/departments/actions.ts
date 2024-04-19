/** @format */

"use server";

import { DepartmentPageRequest } from "@/app/_models/Department";
import {
  deleteDepartmentByID,
  getDepartmentPageByPageRequest,
} from "@/services/DepartmentService";
import "server-only";

export async function paginateDepartments(request: DepartmentPageRequest) {
  const data = await getDepartmentPageByPageRequest(request);

  // If data.elements is present, map over it to create a new array
  // where each element is a flattened version of the original element.
  // If data.elements is not present, use data directly.
  const elements = data.elements
    ? data.elements.map((element) => ({
        name: element.name,
        email: element.employee.email,
        id: element.id,
      }))
    : data;

  return {
    ...data,
    elements,
  };
}

export async function deleteDepartment(id: number) {
  return await deleteDepartmentByID(id);
}
