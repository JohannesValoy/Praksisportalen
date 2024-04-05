import EmployeeObject from "@/app/_models/Employee";
import DBclient from "@/knex/config/DBClient";
import { EmployeeTable } from "knex/types/tables.js";
import { encodeID, encryptPassword } from "@/lib/auth";

async function getEmployeeObjectByID(id: string): Promise<EmployeeObject> {
    const employee = await getEmployeeObjectByIDList([id]);
    if (employee.get(id) == undefined) {
        throw new Error("Employee not found");
    }
    return employee.get(id);
}

async function getEmployeeObjectByIDList(idList: string[]): Promise<Map<string, EmployeeObject>> {
    const query = await DBclient.select().from<EmployeeTable>("employees").whereIn("id", idList);
    const employees: Map<string, EmployeeObject> = new Map();
    query.forEach((employee) => {
        employees.set(employee.id, new EmployeeObject(employee));
    });
    return employees;
}

async function createEmployee(employee : EmployeeTable) {
    employee.id = await encodeID(employee.email, employee.name);
    employee.password = await encryptPassword(employee.password);
    await DBclient.insert(employee).into("employees");
}

async function createEmployees(employee : EmployeeTable[]) {
    for (const emp of employee) {
        await createEmployee(emp);
    }
}

export { getEmployeeObjectByID, getEmployeeObjectByIDList, createEmployee, createEmployees };