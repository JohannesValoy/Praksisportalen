import { Section } from "knex/types/tables.js";
import EmployeeObject from "./Employee";
import InternshipPositionObject from "./InternshipPosition";

class SectionObject implements Section {
    id: number;
    name: string;
    employee_id: number;
    section_type: string;
    employee : EmployeeObject
    internships: InternshipPositionObject[];
    department_id: number;
    created_at: Date;
    updated_at: Date;

    constructor(query: Section, employee: EmployeeObject, internships: InternshipPositionObject[] = []) {
        this.id = query.id;
        this.name = query.name;
        this.section_type = query.section_type;
        this.employee_id = query.employee_id;
        this.employee = employee;
        this.department_id = query.department_id;
        this.created_at = query.created_at;
        this.updated_at = query.updated_at;
        this.internships = internships.copyWithin(0, internships.length);
    }


    toJSON() {
        return {
            id: this.id,
            name: this.name,
            type: this.section_type,
            employee: this.employee,
            internships: this.internships,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

export default SectionObject;