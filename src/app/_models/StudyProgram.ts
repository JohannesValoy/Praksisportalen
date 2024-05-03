import {
  EducationInstitutionTable,
  StudyProgramTable,
} from "knex/types/tables.js";
import { PageRequest } from "./pageinition";
/**
 * A class representing a StudyProgram
 */
export interface StudyProgram extends StudyProgramTable {
  educationInstitution: EducationInstitutionTable;
}

/**
 * StudyProgramPageRequest is a class that represents a request for a paginated list of StudyProgram objects.
 * It should be used when you want to get a list of StudyProgram objects from the server.
 */
export interface StudyProgramPageRequest extends PageRequest {
  containsName: string;
  hasEducationInstitutionID: number;
}
