import { EmployeeTable } from "knex/types/tables.js";
import { PageRequest } from "./pageinition";
import { NextRequest } from "next/server";
/**
 * A class representing a Employee
 */
class EmployeeObject implements EmployeeTable {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    created_at: Date;
    updated_at: Date;

    /**
     * Creates an instance of Employee.
     * @param query DB query
     */
    constructor(query: EmployeeTable) {
        this.id = query.id;
        this.name = query.name;
        this.email = query.email;
        this.password = query.password;
        this.role = query.role;
        this.created_at = query.created_at;
        this.updated_at = query.updated_at;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

class EmployeePaginationRequest extends PageRequest {
    private _name: string;
    private _email: string;
    private _role: string;

    constructor(page, size, sort = "id", name = "", role = "", email = "") {
        super(page, size);
        if (["name", "email", "role"].includes(sort)) {
            this.sort = sort;
        }
        this._name = name;
        this._email = email;
        this._role = role;
    }

    static fromRequest(request : NextRequest) {
        const pageRequest = super.fromRequest(request);
        const name = request.nextUrl.searchParams.get("name") || "";
        const email = request.nextUrl.searchParams.get("email") || "";
        const role = request.nextUrl.searchParams.get("role") || "";
        const sort = request.nextUrl.searchParams.get("sort") || "id";
        return new EmployeePaginationRequest(pageRequest.page, pageRequest.size, sort, name, role, email);
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get role() {
        return this._role;
    }
}

export {EmployeeObject, EmployeePaginationRequest};
