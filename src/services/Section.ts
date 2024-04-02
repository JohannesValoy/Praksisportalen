import SectionObject, { SectionPageRequest } from "@/app/_models/Section";
import EmployeeObject from "@/app/_models/Employee";
import InternshipPositionObject from "@/app/_models/InternshipPosition";
import DBclient from "@/knex/config/DBClient";
import { Section } from "knex/types/tables.js";
import {getEmployeeObjectByIDList } from "./Employees";
import {getInternshipPositionObjectBySectionID } from "./InternshipPosition";

import "server-only"
import { PageResponse } from "@/app/_models/pageinition";

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
    await createSectionObject(query).then((sectionObjects) => {
        sectionObjects.forEach((section) => {
            sections.set(section.id, section);
        });
    })
    return sections;
}

async function getSectionsByPageRequest(pageRequest : SectionPageRequest) {
    const baseQuery = await DBclient.select("").from<Section>("sections").where((builder) => {
        if (pageRequest.hasEmployeeID != -1) {
            builder.where("employee_id", pageRequest.hasEmployeeID);
        }
        if (pageRequest.hasDepartmentID != -1) {
            builder.where("department_id", pageRequest.hasDepartmentID);
        }
        if (pageRequest.containsName != "" && pageRequest.containsName) {
            builder.where("name", "like", `%${pageRequest.containsName}%`);
        }
    }).orderBy(pageRequest.sort);
    const pageQuery = baseQuery.slice(pageRequest.page * pageRequest.size, (pageRequest.page + 1) * pageRequest.size);
    return new PageResponse<SectionObject>(pageRequest, await createSectionObject(pageQuery), baseQuery.length);
}

async function  createSectionObject(query: Section[]) : Promise<SectionObject[]> {
    const employeesPromise: Promise<Map<number, EmployeeObject>> = getEmployeeObjectByIDList(query.map((section) => section.employee_id));
    const internshipsPromise: Promise<Map<number, InternshipPositionObject[]>> = getInternshipPositionObjectBySectionID(query.map((section) => section.id));
    const values = await Promise.allSettled([employeesPromise, internshipsPromise])
    const sections = [];
    if (values.some((value) => value.status === "rejected")) {
        throw new Error("Failed to fetch Section data");
    }
    const employees = values[0].value;
    const internships = values[1].value;
    query.forEach((section) => {
        sections.push(new SectionObject(section, employees?.get(section.employee_id), internships?.get(section.id)));
    });
    return sections;
}

export { getSectionObjectByID, getSectionObjectByIDList, getSectionsByPageRequest };