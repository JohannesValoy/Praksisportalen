import DBclient from "@/knex/config/DBClient";
import DepartmentObject, { DepartmentPageRequest } from "@/app/_models/Department";
import EmployeeObject from "@/app/_models/Employee";
import { Department } from "knex/types/tables.js";
import { getEmployeeObjectByIDList } from "./Employees";

import "server-only"


async function getDepartmentObjectByID(id: number): Promise<DepartmentObject> {
    const department = await getDepartmentObjectByIDList([id]);
    if (department.get(id) == undefined) {
        throw new Error("Department not found");
    }
    return department.get(id);
}

async function getDepartmentObjectByIDList(idList: number[]): Promise<Map<number, DepartmentObject>> {
    const query = await DBclient.select().from<Department>("departments").whereIn("id", idList);
    const departments: Map<number, DepartmentObject> = new Map();
    const employees: Map<number, EmployeeObject> = await getEmployeeObjectByIDList(query.map((department) => department.employee_id));
    query.forEach((department) => {
        departments.set(department.id, new DepartmentObject(department, employees.get(department.employee_id)));
    });
    return departments;
}

async function getDepartmentsByPageRequest(pageRequest : DepartmentPageRequest) : Promise<DepartmentObject[]> 
{
    const query = await DBclient.select("id").from<Department>("departments").where((builder) => {
        if (pageRequest.hasEmployeeID != -1) {
            builder.where("employee_id", pageRequest.hasEmployeeID);
        }
        if (pageRequest.hasSectionID != -1) {
            builder.whereIn("id", (builder) => {
                builder.select("department_id").from("sections").where("id", pageRequest.hasSectionID);
            });
        }
        if (pageRequest.containsName != "" && pageRequest.containsName) {
            builder.where("name", "like", `%${pageRequest.containsName}%`);
        }
        builder.orderBy(pageRequest.sort)
        builder.limit(pageRequest.size);
        builder.offset(pageRequest.page * pageRequest.size);
    })
    return Array.from((await getDepartmentObjectByIDList(query.map((department) => department.id))).values());
    }

export { getDepartmentObjectByID, getDepartmentObjectByIDList, getDepartmentsByPageRequest };