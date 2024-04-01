import { Internship } from "knex/types/tables.js";
import DBclient from "@/knex/config/DBClient";
import { PageRequest } from "@/app/_models/pageinition";
import { NextRequest } from "next/server";

class InternshipPositionObject implements Internship {
    id: number;
    name: string;
    field: string;
    maxCapacity: number;
    currentCapacity: number;
    numberOfBeds: number;
    yearOfStudy: number;
    section_id: number;
    created_at: Date;
    updated_at: Date;

    constructor(query: Internship) {
        this.id = query.id;
        this.name = query.name;
        this.field = query.field;
        this.maxCapacity = query.maxCapacity;
        this.currentCapacity = query.currentCapacity;
        this.numberOfBeds = query.numberOfBeds;
        this.yearOfStudy = query.yearOfStudy;
        this.section_id = query.section_id;
        this.created_at = query.created_at;
        this.updated_at = query.updated_at;
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            field: this.field,
            maxCapacity: this.maxCapacity,
            currentCapacity: this.currentCapacity,
            numberOfBeds: this.numberOfBeds,
            yearOfStudy: this.yearOfStudy,
            section_id: this.section_id,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

class InternshipPaginationRequest extends PageRequest {
    section_id: number[];
    yearOfStudy: number[];
    field: string;

    constructor(page: number = 0, size: number = 10 , sort: string = "id", section_id: number[] = [], yearOfStudy: number[] = [], field: string = "") {
        super(page, size, sort);
        if (sort == null) {
            this.sort = "id";
        }
        this.section_id = section_id;
        this.yearOfStudy = yearOfStudy;
        this.field = field;
    }

    static fromRequest(request: NextRequest): InternshipPaginationRequest {
        const page = super.fromRequest(request);
        const section_id = request.nextUrl.searchParams.get("section_id") ? request.nextUrl.searchParams.get("section_id").split(",").map((id) => parseInt(id)) : null;
        const yearOfStudy = request.nextUrl.searchParams.get("yearOfStudy") ? request.nextUrl.searchParams.get("yearOfStudy").split(",").map((year) => parseInt(year)) : null;
        const field = request.nextUrl.searchParams.get("field");
        return new InternshipPaginationRequest(page.page, page.size, page.sort, section_id, yearOfStudy, field);
    }
}



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