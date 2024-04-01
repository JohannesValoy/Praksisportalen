import { Department } from "knex/types/tables.js";
import EmployeeObject from "./Employee";

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

export default DepartmentObject;