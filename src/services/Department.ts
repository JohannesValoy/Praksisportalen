/** @format */

import DBclient from "@/knex/config/DBClient";
import DepartmentObject, {
  DepartmentPageRequest,
} from "@/app/_models/Department";
import {EmployeeObject} from "@/app/_models/Employee";
import { DepartmentTable } from "knex/types/tables.js";
import { getEmployeeObjectByIDList } from "./Employees";

import "server-only";
import { PageResponse } from "@/app/_models/pageinition";

async function getDepartmentObjectByID(id: number): Promise<DepartmentObject> {
  const department = await getDepartmentObjectByIDList([id]);
  if (department.get(id) == undefined) {
    throw new Error("Department not found");
  }
  return department.get(id);
}

async function getDepartmentObjectByIDList(
  idList: number[],
): Promise<Map<number, DepartmentObject>> {
  const query = await DBclient.select()
    .from<DepartmentTable>("departments")
    .whereIn("id", idList);
  const departments: Map<number, DepartmentObject> = new Map();
  (await createDepartmentObject(query)).forEach((department) =>
    departments.set(department.id, department)
  );
   return departments;
}

async function getDepartmentPageByPageRequest(
  pageRequest: DepartmentPageRequest,
): Promise<PageResponse<DepartmentObject>> {
  const baseQuery = await DBclient.from("employees")
    .innerJoin("departments", "employees.id", "departments.employee_id")
    .where((builder) => {
      if (pageRequest.hasEmployeeID != -1) {
        builder.where("employee_id", pageRequest.hasEmployeeID);
      }
      if (pageRequest.hasSectionID != -1) {
        builder.whereIn("id", (builder) => {
          builder
            .select("department_id")
            .from("sections")
            .where("id", pageRequest.hasSectionID);
        });
      }
      if (pageRequest.containsName != "" && pageRequest.containsName) {
        builder.where("name", "like", `%${pageRequest.containsName}%`);
      }
    })
    .orderBy(pageRequest.sort);
  console.log(baseQuery);
  const pageQuery = baseQuery.slice(
    pageRequest.page * pageRequest.size,
    (pageRequest.page + 1) * pageRequest.size,
  );
  return new PageResponse<DepartmentObject>(
    pageRequest,
    await createDepartmentObject(pageQuery),
    baseQuery.length,
  );
}

async function createDepartmentObject(
  query: DepartmentTable[],
): Promise<DepartmentObject[]> {
  const departments: DepartmentObject[] = [];
  const employees: Map<string, EmployeeObject> =
    await getEmployeeObjectByIDList(
      query.map((department) => department.employee_id),
    );
  query.forEach((department) => {
    departments.push(
      new DepartmentObject(department, employees.get(department.employee_id)),
    );
  });
  return departments;
}
export {
  getDepartmentObjectByID,
  getDepartmentObjectByIDList,
  getDepartmentPageByPageRequest,
};
