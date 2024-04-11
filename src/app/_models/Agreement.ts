import { InternshipAgreement } from "knex/types/tables.js";
import StudyProgramObject from "./StudyProgram";
import InternshipPositionObject from "./InternshipPosition";

class InternshipAgreementObject implements InternshipAgreement {
  private _id: number;
  private _status: string;
  startDate: Date;
  endDate: Date;
  student_id: number;
  internship_id: number;
  studyProgram_id: number;
  studyProgram: StudyProgramObject;
  internship: InternshipPositionObject;
  comment: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    agreement: InternshipAgreement,
    studyProgram: StudyProgramObject,
    interShip: InternshipPositionObject,
  ) {
    this._id = agreement.id;
    this._status = agreement.status;
    this.startDate = agreement.startDate;
    this.endDate = agreement.endDate;
    this.student_id = agreement.student_id;
    this.internship_id = agreement.internship_id;
    this.studyProgram_id = agreement.studyProgram_id;
    this.studyProgram = studyProgram;
    this.comment = agreement.comment;
    this.created_at = agreement.created_at;
    this.updated_at = agreement.updated_at;
    this.internship = interShip;
  }

  get id(): number {
    return this._id;
  }

  get status(): string {
    return this._status;
  }

  toJSON() {
    return {
      id: this._id,
      status: this._status,
      startDate: this.startDate,
      endDate: this.endDate,
      student_id: this.student_id,
      internship: this.internship,
      studyProgram: this.studyProgram,
      comment: this.comment,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export default InternshipAgreementObject;
