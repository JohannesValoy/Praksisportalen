import EmployeeObject from "@/app/_models/Employee";
import DBclient from "@/knex/config/DBClient";
import { User } from "knex/types/tables.js";
import "server-only"

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

export { getEmployeeObjectByID, getEmployeeObjectByIDList };