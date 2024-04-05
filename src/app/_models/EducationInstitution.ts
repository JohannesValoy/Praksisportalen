import { EducationInstitution } from "knex/types/tables.js";

/**
 * A class representing a EducationInstitution
 */
class EducationInstitutionObject implements EducationInstitution {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    /**
     * Create an instance of EducationInstitution from a query
     * @param query from the database
     */
    constructor(query: EducationInstitution) {
        this.id = query.id;
        this.name = query.name;
        this.created_at = query.created_at;
        this.updated_at = query.updated_at;
    }
}

export default EducationInstitutionObject;