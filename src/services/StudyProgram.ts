import { StudyProgramTable } from "knex/types/tables.js";
import { getEducationInstitutionByIDList } from "./EducationInstitute";
import DBclient from "@/knex/config/DBClient";
import StudyProgramObject from "@/app/_models/StudyProgram";
import "server-only"

async function getStudyProgramObjectByID(id: number): Promise<StudyProgramObject> {
    const studyProgram = (await getStudyProgramObjectByIDList([id])).get(id);
    if (studyProgram == undefined) {
        throw new Error("Study Program not found");
    }
    return studyProgram;
    }

async function getStudyProgramObjectByIDList(idList: number[]): Promise<Map<number, StudyProgramObject>> {
        const query = await DBclient.select().from<StudyProgramTable>("study_program").whereIn("id", idList);
        const studyPrograms: Map<number, StudyProgramObject> = new Map();
        const educationInstitutionIDs = new Set(query.map((studyProgram) => studyProgram.educationInstitution_id));
        const educationInstitutions = await getEducationInstitutionByIDList(educationInstitutionIDs);
        for (const studyProgram of query) {
            studyPrograms.set(studyProgram.id, new StudyProgramObject(studyProgram, educationInstitutions.get(studyProgram.educationInstitution_id)));
        }
        return studyPrograms;
    }

export { getStudyProgramObjectByID, getStudyProgramObjectByIDList };