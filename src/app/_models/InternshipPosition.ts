import { NextRequest } from "next/server";
import { PageRequest } from "./pageinition";
import { Internship } from "knex/types/tables.js";

class InternshipPositionObject implements Internship {
    id: number;
    name: string;
    internship_field: string;    
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
        this.internship_field = query.internship_field;
        this.maxCapacity = query.maxCapacity;
        this.currentCapacity = query.currentCapacity;
        this.numberOfBeds = query.numberOfBeds;
        this.yearOfStudy = query.yearOfStudy;
        this.section_id = query.section_id;
        this.created_at = query.created_at;
        this.updated_at = query.updated_at;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            field: this.internship_field,
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

export class InternshipPaginationRequest extends PageRequest {
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

export default InternshipPositionObject;