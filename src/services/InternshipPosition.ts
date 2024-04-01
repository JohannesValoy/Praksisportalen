import { Internship } from "knex/types/tables.js";
import { InternshipAgreementObject, fetchInternshipAgreementByInternshipID } from "./Agreement";
import DBclient from "@/knex/config/DBClient";

class InternshipPositionObject implements Internship {
    id: number;
    name: string;
    field: string;
    maxCapacity: number;
    currentCapacity: number;
    numberOfBeds: number;
    yearOfStudy: number;
    section_id: number;
    internshipAgreements: InternshipAgreementObject[];
    created_at: Date;
    updated_at: Date;

    constructor(query: Internship, agreements: InternshipAgreementObject[]) {
        this.id = query.id;
        this.name = query.name;
        this.field = query.field;
        this.maxCapacity = query.maxCapacity;
        this.currentCapacity = query.currentCapacity;
        this.numberOfBeds = query.numberOfBeds;
        this.yearOfStudy = query.yearOfStudy;
        this.section_id = query.section_id;
        this.internshipAgreements = agreements;
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
            internshipAgreements: this.internshipAgreements,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
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
    const internshipAgreements: Map<number, InternshipAgreementObject[]> = await fetchInternshipAgreementByInternshipID(idList);
    query.forEach((internship) => {
        internships.set(internship.id, new InternshipPositionObject(internship, internshipAgreements.get(internship.id)));
    });
    return internships;
}

export { InternshipPositionObject, getInternshipPositionObjectByID, getInternshipPositionObjectByIDList};