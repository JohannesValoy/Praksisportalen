import { Knex } from "knex";

declare module "knex/types/tables.js" {
  interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    created_at: Date;
    updated_at: Date;
  }

  interface Account {
    id: number;
    type: string;
    provider: string;
    providerAccountID: string;
    user_id: number;
    created_at: Date;
    updated_at: Date;
  }

  interface Department {
    id: number;
    name: string;
    employee_id: number;
    created_at: Date;
    updated_at: Date;
  }

  interface Section {
    id: number;
    name: string;
    type: string;
    employee_id: number;
    department_id: number;
    created_at: Date;
    updated_at: Date;
  }

  interface SectionType {
    name: string;
  }

  interface Internship {
    id: number;
    name: string;
    field: string;
    maxCapacity: number;
    currentCapacity: number;
    numberOfBeds: number;
    yearOfStudy: number;
    section_id: number;
    created_at: Date;
    updated_at: Date;
  }

  interface InternshipField {
    name: string;
  }

  interface EducationInstitution {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
  }

  interface StudyProgram {
    id: number;
    name: string;
    educationInstitution_id: number;
    created_at: Date;
    updated_at: Date;
  }

  interface internshipAgreements {
    id: number;
    status: string;
    startDate: Date;
    endDate: Date;
    student_id: number;
    internship_id: number;
    studyProgram_id: number;
    comment: string;
    created_at: Date;
    updated_at: Date;
  }

  interface Tables {
    users: User;
    departments: Department;
    accounts: Account;
    sectors: Section;
    internships: Internship;
    educationInstitutions: EducationInstitution;
    studyPrograms: StudyProgram;
    internshipAgreements: internshipAgreements;
  }
}
