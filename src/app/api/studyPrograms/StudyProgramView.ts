/** @format */

import { StudyProgramTable } from "knex/types/tables.js";

class StudyProgramView {
  id: number;
  name: string;
  email: string;
  educationInstitution_id: number;
  created_at: Date;
  updated_at: Date;

  constructor(studyProgram: StudyProgramTable) {
    this.id = studyProgram.id;
    this.name = studyProgram.name;
    this.educationInstitution_id = studyProgram.educationInstitution_id;
    this.created_at = studyProgram.created_at;
    this.updated_at = studyProgram.updated_at;
  }
}

export default StudyProgramView;
