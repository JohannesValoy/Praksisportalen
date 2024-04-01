import DBclient from "@/knex/config/DBClient";
import { TimeInterval, fetchTimeIntervalByIDList } from "./TimeInterval";
import { InternshipAgreements } from "knex/types/tables.js";

class InternshipAgreementObject implements InternshipAgreements {
    private _id: number;
    private _timeIntervals: TimeInterval[];
    private _status: string;
    startDate: Date;
    endDate: Date;
    student_id: number;
    internship_id: number;
    studyProgram_id: number;
    comment: string;
    created_at: Date;
    updated_at: Date;

    constructor(agreement: InternshipAgreements, intervals: TimeInterval[] = null) {
        this._id = agreement.id;
        this._timeIntervals = intervals;
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

    get timeIntervals(): TimeInterval[] {
        return this._timeIntervals;
    }

    get status(): string {
        return this._status;
    }

    toJSON() {
        return {
            id: this._id,
            timeIntervals: this._timeIntervals,
            status: this._status,
            startDate: this.startDate,
            endDate: this.endDate,
            student_id: this.student_id,
            internship_id: this.internship_id,
            studyProgram_id: this.studyProgram_id,
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
    const query = await DBclient.select().from<InternshipAgreements>("internship_agreements").whereIn("id", idList);
    const agreements: Map<number, InternshipAgreementObject> = new Map();
    const timeIntervalIDs = new Set(query.map((agreement) => agreement.id));
    const timeIntervals = await fetchTimeIntervalByIDList(timeIntervalIDs);
    const agreementIds = new Set(query.map((agreement) => agreement.id));
    agreementIds.forEach((id) => {
        const timeintervalsForAgreement = query.filter((agreement) => agreement.id == id).map((agreement) => timeIntervals.get(agreement.intervalID));
        agreements.set(id, new InternshipAgreementObject(query.find((agreement) => agreement.id == id), timeintervalsForAgreement));
    })
    return agreements;
}

export { InternshipAgreementObject, fetchInternshipAgreementByID };