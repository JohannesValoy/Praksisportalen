import { Section } from "knex/types/tables.js";
import { EmployeeObject, getEmployeeObjectByIDList } from "./Employees";
import DBclient from "@/knex/config/DBClient";
import { InternshipPositionObject, getInternshipPositionObjectBySectionID } from "./InternshipPosition";
import "server-only"
import SectionObject from "@/app/_models/Section";


async function getSectionObjectByID(id: number): Promise<SectionObject> {
    const section = await getSectionObjectByIDList([id]);
    if (section.get(id) == undefined) {
        throw new Error("Section not found");
    }
    return section.get(id);
}

async function getSectionObjectByIDList(idList: number[]): Promise<Map<number, SectionObject>> {
    const query = await DBclient.select().from<Section>("sections").whereIn("id", idList);
    const sections: Map<number, SectionObject> = new Map();
    const employeesPromise: Promise<Map<number, EmployeeObject>> = getEmployeeObjectByIDList(query.map((section) => section.employee_id));
    const internshipsPromise: Promise<Map<number, InternshipPositionObject[]>> = getInternshipPositionObjectBySectionID(query.map((section) => section.id));
    const values = await Promise.allSettled([employeesPromise, internshipsPromise])
    if (values.some((value) => value.status === "rejected")) {
        throw new Error("Failed to fetch Section data");
    }
    const employees = values[0].value;
    const internships = values[1].value;
    query.forEach((section) => {
        sections.set(section.id, new SectionObject(section, employees?.get(section.employee_id), internships?.get(section.id)));
    });
    return sections;
}

export { SectionObject, getSectionObjectByID, getSectionObjectByIDList };