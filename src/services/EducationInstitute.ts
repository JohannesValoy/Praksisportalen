import EducationInstitutionObject from "@/app/_models/EducationInstitution";
import DBclient from "@/knex/config/DBClient";
import { EducationInstitution } from "knex/types/tables.js";
import "server-only"

async function getEducationInstitutionByID(id: number) : Promise<EducationInstitutionObject> {
    const institute = (await getEducationInstitutionByIDList(new Set([id]))).get(id);
    if (institute == undefined) {
        throw new Error("Education Institution not found");
    }
    return institute[0];
}

async function getEducationInstitutionByIDList(idList : Set<number>) : Promise<Map<number, EducationInstitutionObject>> {
    const query = await DBclient.select().from<EducationInstitution>("educationInstitutions").whereIn("id", Array.from(idList));
    const educationInstitutions : Map<number, EducationInstitutionObject> = new Map();
    for (const educationInstitution of query) {
        educationInstitutions.set(educationInstitution.id, new EducationInstitutionObject(educationInstitution));
    }
    return educationInstitutions;
}


export { EducationInstitutionObject, getEducationInstitutionByID, getEducationInstitutionByIDList};