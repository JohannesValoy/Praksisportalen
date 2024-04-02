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

export default EducationInstitutionObject;