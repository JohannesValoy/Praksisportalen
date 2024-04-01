import { Department } from "knex/types/tables.js";
import { EmployeeObject, getEmployeeObjectByIDList } from "./Employees";
import DBclient from "@/knex/config/DBClient";
import DepartmentObject from "@/app/_models/Department";
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

export { getDepartmentObjectByID, getDepartmentObjectByIDList };