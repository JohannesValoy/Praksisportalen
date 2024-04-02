import DBclient from "@/knex/config/DBClient";
import { InternshipAgreements } from "knex/types/tables.js";
import { StudyProgramObject } from "./StudyProgram";

class InternshipAgreementObject implements InternshipAgreements {
    private _id: number;
    private _status: string;
    startDate: Date;
    endDate: Date;
    student_id: number;
    internship_id: number;
    studyProgram_id: number;
    private studyProgram: StudyProgramObject;
    comment: string;
    created_at: Date;
    updated_at: Date;

    constructor(agreement: InternshipAgreements) {
        this._id = agreement.id;

        this._status = agreement.status;
        this.startDate = agreement.startDate;
        this.endDate = agreement.endDate;
        this.student_id = agreement.student_id;
        this.internship_id = agreement.internship_id;
        this.studyProgram_id = agreement.studyProgram_id;
        this.comment = agreement.comment;
        this.created_at = agreement.created_at;
        this.updated_at = agreement.updated_at;
    }

    get id(): number {
        return this._id;
    }

    get status(): string {
        return this._status;
    }

    toJSON() {
        return {
            id: this._id,
            status: this._status,
            startDate: this.startDate,
            endDate: this.endDate,
            student_id: this.student_id,
            internship_id: this.internship_id,
            studyProgram: this.studyProgram,
            comment: this.comment,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

async function fetchInternshipAgreementByID(id: number): Promise<InternshipAgreementObject> {
    const agreement = (await fetchInternshipAgreementByIDList([id])).get(id);
    if (agreement == undefined) {
        throw new Error("Internship Agreement not found");
    }
    return agreement;
}

async function fetchInternshipAgreementByIDList(idList: number[]): Promise<Map<number, InternshipAgreementObject>> {
    const query = await DBclient.select().from<InternshipAgreements>("internshipAgreements").whereIn("id", idList)
    const agreements: Map<number, InternshipAgreementObject> = new Map();
    idList.forEach((id) => {
        agreements.set(id, new InternshipAgreementObject(query.find((agreement) => agreement.id == id)//, timeintervalsForAgreement
        ));
    })
    return agreements;
}

async function fetchInternshipAgreementByInternshipID(internshipsID : number[]) : Promise<Map<number,InternshipAgreementObject[]>>  {
    const query = await DBclient.select("id").from<InternshipAgreements>("internshipAgreements").whereIn("internship_id", internshipsID);
    const agreementIds = query.map((agreement) => agreement.id);
    const agreements = (await fetchInternshipAgreementByIDList(agreementIds)).values();
    const internshipAgreements: Map<number, InternshipAgreementObject[]> = new Map();
    let agreement = agreements.next();
    while (!agreement.done) {
        const internship_id = agreement.value.internship_id;
        if (!internshipAgreements.has(internship_id)) {
            internshipAgreements.set(internship_id, []);
        }
        internshipAgreements.get(internship_id).push(agreement.value);
        agreement = agreements.next();

    }
    return internshipAgreements;
}


export { InternshipAgreementObject, fetchInternshipAgreementByID, fetchInternshipAgreementByInternshipID, fetchInternshipAgreementByIDList };