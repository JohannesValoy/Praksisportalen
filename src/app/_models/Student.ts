import { StudentTable } from "knex/types/tables.js";

class Student implements StudentTable {
  id?: string;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(query: StudentTable) {
    this.id = query.id;
    this.name = query.name;
    this.email = query.email;
    this.created_at = query.created_at;
    this.updated_at = query.updated_at;
  }
}

export default Student;
