import { CoordinatorTable } from "knex/types/tables.js";

class Coordinator implements CoordinatorTable {
    id?: string;
    name: string;
    email: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(query: CoordinatorTable) {
        this.id = query.id;
        this.name = query.name;
        this.email = query.email;
        this.password = query.password;
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
        }
    }
}