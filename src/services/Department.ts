import { Department } from "knex/types/tables.js";
import { EmployeeObject, getEmployeeObjectByIDList } from "./Employees";
import DBclient from "@/knex/config/DBClient";

class DepartmentObject implements Department {
    id: number;
    name: string;
    employee_id: number;
    employee : EmployeeObject;
    created_at: Date;
    updated_at: Date;

    constructor(query: Department, employee: EmployeeObject) {
        this.id = query.id;
        this.name = query.name;
        this.employee_id = query.employee_id;
        this.employee = employee;
        this.created_at = query.created_at;
        this.updated_at = query.updated_at;
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            employee: this.employee,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

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

export { DepartmentObject, getDepartmentObjectByID, getDepartmentObjectByIDList };