/** @format */

import DBclient from "@/knex/config/DBClient";
import { Department, DepartmentPageRequest } from "@/app/_models/Department";
import { DepartmentTable, EmployeeTable } from "knex/types/tables.js";
import { getEmployeeObjectByIDList } from "./EmployeeService";

import "server-only";
import { PageResponse } from "@/app/_models/pageinition";

async function getDepartmentObjectByID(id: number): Promise<Department> {
  const department = await getDepartmentObjectByIDList([id]);
  if (department.get(id) == undefined) {
    throw new Error("Department not found");
  }
  return department.get(id);
}

async function getDepartmentObjectByIDList(
  idList: number[]
): Promise<Map<number, Department>> {
  const query = await DBclient.select()
    .from<DepartmentTable>("departments")
    .whereIn("id", idList);
  const departments: Map<number, Department> = new Map();
  await createDepartmentObject(query).then((departmentObjects) => {
    departmentObjects.forEach((department) => {
      departments.set(department.id, department);
    });
  });
  return departments;
}

async function getDepartmentPageByPageRequest(
  pageRequest: DepartmentPageRequest
): Promise<PageResponse<Department>> {
  const baseQuery = await DBclient.from("employees")
    .innerJoin("departments", "employees.id", "departments.employee_id")
    .where((builder) => {
      if (pageRequest.hasEmployeeID) {
        builder.where("employee_id", pageRequest.hasEmployeeID);
      }
      if (pageRequest.hasSectionID) {
        builder.whereIn("id", (builder) => {
          builder
            .select("department_id")
            .from("sections")
            .where("id", pageRequest.hasSectionID);
        });
      }
      if (pageRequest.containsName) {
        builder.where("name", "like", `%${pageRequest.containsName}%`);
      }
    })
    .orderBy(
      "departments." +
        (["id", "name"].includes(pageRequest.sort) ? pageRequest.sort : "id")
    );
  //TODO: ^above add email from employees table
  console.log(baseQuery);
  const pageQuery = baseQuery.slice(
    pageRequest.page * pageRequest.size,
    (pageRequest.page + 1) * pageRequest.size
  );
  return {
    ...pageRequest,
    elements: await createDepartmentObject(pageQuery),
    totalElements: baseQuery.length,
    totalPages: Math.ceil(baseQuery.length / pageRequest.size),
  };
}

async function createDepartmentObject(
  query: DepartmentTable[]
): Promise<Department[]> {
  const departments: Department[] = [];
  const employees: Map<string, EmployeeTable> = await getEmployeeObjectByIDList(
    query.map((department) => department.employee_id)
  );
  query.forEach((department) => {
    departments.push({
      ...department,
      employee: employees.get(department.employee_id),
    });
  });
  return departments;
}

async function deleteDepartmentByID(id: number) {
  await DBclient.delete().from("departments").where("id", id);
}

export {
  getDepartmentObjectByID,
  getDepartmentObjectByIDList,
  getDepartmentPageByPageRequest,
  deleteDepartmentByID,
};
