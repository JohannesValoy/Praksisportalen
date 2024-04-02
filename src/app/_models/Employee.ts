import { User } from "knex/types/tables.js";

class EmployeeObject implements User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    created_at: Date;
    updated_at: Date;

    constructor(query: User) {
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
