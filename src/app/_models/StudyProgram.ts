/** @format */

import {
  EducationInstitutionTable,
  StudyProgramTable,
} from "knex/types/tables.js";
/**
 * A class representing a StudyProgram
 */
export interface StudyProgram extends StudyProgramTable {
  educationInstitution: EducationInstitutionTable;
}
