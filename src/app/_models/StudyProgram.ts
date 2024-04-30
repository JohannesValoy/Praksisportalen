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

export interface StudyProgramPageRequest extends PageRequest {
  containsName: string;
}
