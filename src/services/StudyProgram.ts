import { StudyProgram } from "knex/types/tables.js";
import { EducationInstitutionObject, getEducationInstitutionByIDList } from "./EducationInstitute";
import DBclient from "@/knex/config/DBClient";
class StudyProgramObject implements StudyProgram {
    id: number;
    name: string;
    educationInstitution_id: number;
    educationInstitution: EducationInstitutionObject;
    created_at: Date;
    updated_at: Date;

    constructor(query: StudyProgram, educationInstitution: EducationInstitutionObject) {
        this.id = query.id;
        this.name = query.name;
        this.educationInstitution_id = query.educationInstitution_id;
        this.educationInstitution = educationInstitution;
        this.created_at = query.created_at;
        this.updated_at = query.updated_at;
    }
    
}    



async function getStudyProgramObjectByID(id: number): Promise<StudyProgramObject> {
    const studyProgram = (await getStudyProgramObjectByIDList([id])).get(id);
    if (studyProgram == undefined) {
        throw new Error("Study Program not found");
    }
    return studyProgram;
    }

async function getStudyProgramObjectByIDList(idList: number[]): Promise<Map<number, StudyProgramObject>> {
        const query = await DBclient.select().from<StudyProgram>("study_program").whereIn("id", idList);
        const studyPrograms: Map<number, StudyProgramObject> = new Map();
        const educationInstitutionIDs = new Set(query.map((studyProgram) => studyProgram.educationInstitution_id));
        const educationInstitutions = await getEducationInstitutionByIDList(educationInstitutionIDs);
        for (const studyProgram of query) {
            studyPrograms.set(studyProgram.id, new StudyProgramObject(studyProgram, educationInstitutions.get(studyProgram.educationInstitution_id)));
        }
        return studyPrograms;
    }