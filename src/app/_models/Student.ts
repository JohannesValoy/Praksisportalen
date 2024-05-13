import { EducationInstitutionTable, StudentTable } from "knex/types/tables.js";
import { PageRequest } from "./pageinition";

/**
 * A interface representing a Student
 */
export interface Student extends StudentTable {
  educationInstitution: EducationInstitutionTable;
}

/**
 * StudentPageRequest is a interface that represents a request for a paginated list of Student objects.
 * It should be used when you want to get a list of Student objects from the server.
 */
export interface StudentPageRequest extends PageRequest {
  hasName: string;
  hasEmail: string;
  educationInstitutionID: string;
}
