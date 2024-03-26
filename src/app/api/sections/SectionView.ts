/** @format */

import { Section } from "knex/types/tables.js";

class SectionView {
  id: number;
  name: string;
  type: string;
  employee_id: number;
  department_id: number;
  created_at: Date;
  updated_at: Date;

  constructor(section: Section) {
    this.id = section.id;
    this.name = section.name;
    this.type = section.type;
    this.employee_id = section.employee_id;
    this.department_id = section.department_id;
    this.created_at = section.created_at;
    this.updated_at = section.updated_at;
  }
}

export default SectionView;
