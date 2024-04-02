import InternshipAgreementObject from "@/app/_models/Agreement";
import DBclient from "@/knex/config/DBClient";
import { InternshipAgreement } from "knex/types/tables.js";
import { getStudyProgramObjectByIDList } from "./StudyProgram";
import { getInternshipPositionObjectByIDList } from "./InternshipPosition";
import "server-only"

async function fetchInternshipAgreementByID(id: number): Promise<InternshipAgreementObject> {
    const agreement = (await fetchInternshipAgreementByIDList([id])).get(id);
    if (agreement == undefined) {
        throw new Error("Internship Agreement not found");
    }
    return agreement;
}

async function fetchInternshipAgreementByIDList(idList: number[]): Promise<Map<number, InternshipAgreementObject>> {
    const query = await DBclient.select().from<InternshipAgreement>("internshipAgreements").whereIn("id", idList)
    const agreements: Map<number, InternshipAgreementObject> = new Map();
    const studyPrograms = await getStudyProgramObjectByIDList(query.map((agreement) => agreement.studyProgram_id));
    const internships = await getInternshipPositionObjectByIDList(query.map((agreement) => agreement.internship_id));
    query.forEach((agreement) => {
        agreements.set(agreement.id, new InternshipAgreementObject(agreement, studyPrograms.get(agreement.studyProgram_id), internships.get(agreement.internship_id)));
    })
    return agreements;
}

async function fetchInternshipAgreementByInternshipID(internshipsID : number[]) : Promise<Map<number,InternshipAgreementObject[]>>  {
    const query = await DBclient.select("id").from<InternshipAgreement>("internshipAgreements").whereIn("internship_id", internshipsID);
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


export { fetchInternshipAgreementByID, fetchInternshipAgreementByInternshipID, fetchInternshipAgreementByIDList };