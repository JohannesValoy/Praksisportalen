/** @format */
import { Department } from "knex/types/tables.js";

class DepartmentView {
  id: number;
  name: string;
  employee_id: number;
  created_at: Date;
  updated_at: Date;

  constructor(department: Department) {
    this.id = department.id;
    this.name = department.name;
    this.employee_id = department.employee_id;
    this.created_at = department.created_at;
    this.updated_at = department.updated_at;
  }

  static fromArray(departments: Department[]): DepartmentView[] {
    return departments.map((department) => new DepartmentView(department));
  }
}

export default DepartmentView;
