import { UserTable } from "knex/types/tables.js";
/**
 * A class representing a Employee
 */
class EmployeeObject implements UserTable {
    id: number;
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
    constructor(query: UserTable) {
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

export default EmployeeObject;
