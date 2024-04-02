import { Section } from "knex/types/tables.js";
import EmployeeObject from "./Employee";
import InternshipPositionObject from "./InternshipPosition";
import { PageRequest } from "./pageinition";
import { NextRequest } from "next/server";

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

export class SectionPageRequest extends PageRequest {
    
        private _hasEmployeeID : number;
        private _hasDepartmentID : number;
        private _containsName : string;
        
        constructor(page: number, size: number, sort : string, hasEmployeeID : number, hasDepartmentID : number, containsName : string) {
            super(page, size);
            if (["name", "created_at", "updated_at"].includes(sort)) {
                this.sort = sort;
            }
            this._hasEmployeeID = hasEmployeeID;
            this._hasDepartmentID = hasDepartmentID;
            this._containsName = containsName;
        }
        static fromRequest(request: NextRequest): SectionPageRequest {
            const pageRequest = super.fromRequest(request);
            const hasEmployeeID = request.nextUrl.searchParams.get("leaderID")
                ? parseInt(request.nextUrl.searchParams.get("leaderID"))
                : -1;
            const hasDepartmentID = request.nextUrl.searchParams.get("hasDepartmentID")
                ? parseInt(request.nextUrl.searchParams.get("hasDepartmentID"))
                : -1;
            const containsName = request.nextUrl.searchParams.get("containsName")
                ? request.nextUrl.searchParams.get("containsName")
                : "";
            const sort = request.nextUrl.searchParams.get("sort")
            return new SectionPageRequest(pageRequest.page, pageRequest.size, sort, hasEmployeeID, hasDepartmentID, containsName);
        }

    get hasEmployeeID() : number {
        return this._hasEmployeeID;
    }

    get hasDepartmentID() : number {
        return this._hasDepartmentID;
    }

    get containsName() : string {
        return this._containsName;
    }
}

export default SectionObject;