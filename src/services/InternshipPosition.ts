import { Internship } from "knex/types/tables.js";
import DBclient from "@/knex/config/DBClient";
import InternshipPositionObject, { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";
import "server-only"


async function getInternshipPositionObjectByID(id: number): Promise<InternshipPositionObject> {
    const internship = await getInternshipPositionObjectByIDList([id]);
    if (internship.get(id) == undefined) {
        throw new Error("Internship Position not found");
    }
    return internship.get(id);
}

async function getInternshipPositionObjectByIDList(idList: number[]): Promise<Map<number, InternshipPositionObject>> {
    const query = await DBclient.select().from<Internship>("internships").whereIn("id", idList);
    const internships: Map<number, InternshipPositionObject> = new Map();
    query.forEach((internship) => {
        internships.set(internship.id, new InternshipPositionObject(internship));
    });
    return internships;
}

async function getInternshipPositionObjectBySectionID(sections : number[]) : Promise<Map<number, InternshipPositionObject[]>> {
    const query = await DBclient.from<Internship>("internships").select("id","section_id").whereIn("section_id", sections);
    const internships = await getInternshipPositionObjectByIDList(query.map((internship) => internship.id));
    const internshipsMap = new Map();
    query.forEach((internship) => {
        if (internshipsMap.has(internship.section_id)) {
            internshipsMap.get(internship.section_id).push(internships.get(internship.id));
        } else {
            internshipsMap.set(internship.section_id, [internships.get(internship.id)]);
        }
    });
    return internshipsMap;
}



async function getInternshipPositionObjectByPage(pageRequest : InternshipPaginationRequest) : Promise<InternshipPositionObject[]> {
    const query = await DBclient.select().from<Internship>("internships").where((builder) => {
        if (pageRequest.section_id != null && pageRequest.section_id.length > 0) {
            builder.whereIn("section_id", pageRequest.section_id);
        }
        if (pageRequest.yearOfStudy != null && pageRequest.yearOfStudy.length > 0) {
            builder.whereIn("yearOfStudy", pageRequest.yearOfStudy);
        }
        if (pageRequest.field != null && pageRequest.field.length > 0) {
            builder.where("field", pageRequest.field);
        }
        builder.orderBy(pageRequest.sort);
        builder.limit(pageRequest.size);
        builder.offset(pageRequest.page * pageRequest.size);
    });
    const internships: InternshipPositionObject[] = [];
    query.forEach((internship) => {
        internships.push(new InternshipPositionObject(internship));
    })
    return internships;

}


export { InternshipPositionObject, getInternshipPositionObjectByID, getInternshipPositionObjectByIDList, getInternshipPositionObjectBySectionID};