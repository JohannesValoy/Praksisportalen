import { StudyProgram } from "knex/types/tables.js";
import EducationInstitutionObject from "./EducationInstitution";

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

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            educationInstitution: this.educationInstitution,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}    

export default StudyProgramObject;