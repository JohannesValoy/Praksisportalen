/** @format */

"use server";

import { DepartmentPageRequest } from "@/app/_models/Department";
import { deleteDepartmentByID, getDepartmentPageByPageRequest } from "@/services/DepartmentService";
import "server-only";

export async function paginateDepartments(request: DepartmentPageRequest) {
  return await getDepartmentPageByPageRequest(request);
}

export async function deleteDepartment(id: number) {
  return await deleteDepartmentByID(id);
}
