import { EducationInstitutionTable } from "knex/types/tables.js";
import { PageRequest } from "./pageinition";

/**
 * EducationInstitutionPageRequest is a class that represents a request for a paginated list of EducationInstitution objects.
 * It should be used when you want to get a list of EducationInstitution objects from the server.
 */
export interface EducationInstitutionPageRequest extends PageRequest {
  containsName?: string;
}

/**
 * A class representing an EducationInstitution
 */
export interface EducationInstitution extends EducationInstitutionTable {}
