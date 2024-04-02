import { Department } from "knex/types/tables.js";
import EmployeeObject from "./Employee";
import { PageRequest } from "./pageinition";
import { NextRequest } from "next/server";

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

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            employee: this.employee,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

/**
 * 
 */
export class DepartmentPageRequest extends PageRequest {

    private _hasEmployeeID : number;
    private _hasSectionID : number;
    private _containsName : string;
    
    constructor(page: number, size: number, sort : string, hasEmployeeID : number, hasSectionID : number, containsName : string) {
        super(page, size);
        if (["name", "created_at", "updated_at"].includes(sort)) {
            this.sort = sort;
        }
        this._hasEmployeeID = hasEmployeeID;
        this._hasSectionID = hasSectionID;
        this._containsName = containsName;
    }
    static fromRequest(request: NextRequest): DepartmentPageRequest {
        const pageRequest = super.fromRequest(request);
        const hasEmployeeID = request.nextUrl.searchParams.get("leaderID")
            ? parseInt(request.nextUrl.searchParams.get("leaderID"))
            : -1;
        const hasSectionID = request.nextUrl.searchParams.get("hasSectionID")
            ? parseInt(request.nextUrl.searchParams.get("hasSectionID"))
            : -1;
        const containsName = request.nextUrl.searchParams.get("containsName")
            ? request.nextUrl.searchParams.get("containsName")
            : "";
        const sort = request.nextUrl.searchParams.get("sort")
        return new DepartmentPageRequest(pageRequest.page, pageRequest.size, sort, hasEmployeeID, hasSectionID, containsName);
    }
    
    public get hasEmployeeID() : number {
        return this._hasEmployeeID
    }

    public get hasSectionID() : number {
        return this._hasSectionID
    }

    public get containsName() : string {
        return this._containsName
    }
    
}

export default DepartmentObject;