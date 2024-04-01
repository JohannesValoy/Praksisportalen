import DBclient from "@/knex/config/DBClient";
import { EducationInstitution } from "knex/types/tables.js";

class EducationInstitutionObject implements EducationInstitution {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;

    constructor(query: EducationInstitution) {
        this.id = query.id;
        this.name = query.name;
        this.created_at = query.created_at;
        this.updated_at = query.updated_at;
    }
}


async function getEducationInstitutionByID(id: number) : Promise<EducationInstitutionObject> {
    const institute = (await getEducationInstitutionByIDList(new Set([id]))).get(id);
    if (institute == undefined) {
        throw new Error("Education Institution not found");
    }
    return institute[0];
}

async function getEducationInstitutionByIDList(idList : Set<number>) : Promise<Map<number, EducationInstitutionObject>> {
    const query = await DBclient.select().from("education_institution").whereIn("id", idList);
    const educationInstitutions : Map<number, EducationInstitutionObject> = new Map();
    for (const educationInstitution of query) {
        educationInstitutions.set(educationInstitution.id, new EducationInstitutionObject(educationInstitution));
    }
    return educationInstitutions;
}


export { EducationInstitutionObject, getEducationInstitutionByID, getEducationInstitutionByIDList};