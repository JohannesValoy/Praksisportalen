import DBclient from "@/knex/config/DBClient";
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

async function getEmployeeObjectByID(id: number): Promise<EmployeeObject> {
    const employee = await getEmployeeObjectByIDList([id]);
    if (employee.get(id) == undefined) {
        throw new Error("Employee not found");
    }
    return employee.get(id);
}

async function getEmployeeObjectByIDList(idList: number[]): Promise<Map<number, EmployeeObject>> {
    const query = await DBclient.select().from<User>("users").whereIn("id", idList);
    const employees: Map<number, EmployeeObject> = new Map();
    query.forEach((employee) => {
        employees.set(employee.id, new EmployeeObject(employee));
    });
    return employees;
}

export { getEmployeeObjectByID, getEmployeeObjectByIDList, EmployeeObject };