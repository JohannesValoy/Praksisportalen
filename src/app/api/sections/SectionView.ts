/** @format */

import { SectionTable } from "knex/types/tables.js";

class SectionView {
  id: number;
  name: string;
  type: string;
  employee_id: number;
  department_id: number;
  created_at: Date;
  updated_at: Date;
  employee_email: string; // Add this line

  constructor(
    section: SectionTable & { employee_email: string } & { type: string } & {
      department_id: number;
    } & { employee_id: number }
  ) {
    // Modify this line
    this.id = section.id;
    this.name = section.name;
    this.type = section.type;
    this.employee_id = section.employee_id;
    this.department_id = section.department_id;
    this.created_at = section.created_at;
    this.updated_at = section.updated_at;
    this.employee_email = section.employee_email; // Add this line
  }
}

export default SectionView;
