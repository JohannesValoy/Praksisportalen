/** @format */

import { Internship } from "knex/types/tables.js";

class InternshipView {
  id: number;
  name: string;
  field: string;
  maxCapacity: number;
  employee_email: string;
  employee_id: number;
  currentCapacity: number;
  numberOfBeds: number;
  yearOfStudy: number;
  section_id: number;
  created_at: Date;
  updated_at: Date;

  constructor(internship: Internship) {
    this.id = internship.id;
    this.name = internship.name;
    this.field = internship.field;
    this.maxCapacity = internship.maxCapacity;
    this.currentCapacity = internship.currentCapacity;
    this.numberOfBeds = internship.numberOfBeds;
    this.employee_email = internship.employee_email;
    this.employee_id = internship.employee_id;
    this.yearOfStudy = internship.yearOfStudy;
    this.section_id = internship.section_id;
    this.created_at = internship.created_at;
    this.updated_at = internship.updated_at;
  }
}

export default InternshipView;