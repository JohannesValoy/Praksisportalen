/** @format */
interface UserAttributes {
  id?: string;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}

declare module "knex/types/tables.js" {
  interface EmployeeTable extends CoordinatorTable {
    role: string;
  }

  interface StudentTable extends UserAttributes {}

  interface CoordinatorTable extends UserAttributes {
    password: string;
  }

  interface DepartmentTable {
    id: number;
    name: string;
    employee_id: string;
    created_at: Date;
    updated_at: Date;
  }

  interface SectionType {
    name: string;
  }

  interface SectionTable {
    id: number;
    name: string;
    section_type: string;
    employee_id: string;
    department_id: number;
    created_at: Date;
    updated_at: Date;
  }

  interface InternshipFieldTable {
    name: string;
  }

  interface InternshipTable {
    id: number;
    name: string;
    internship_field: string;
    maxCapacity: number;
    currentCapacity: number;
    numberOfBeds: number;
    yearOfStudy: number;
    section_id: number;
    created_at: Date;
    updated_at: Date;
  }

  interface EducationInstitutionTable {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
  }

  interface StudyProgramTable {
    id: number;
    name: string;
    educationInstitution_id: number;
    created_at: Date;
    updated_at: Date;
  }

  interface InternshipAgreementTable {
    id: number;
    status: string;
    startDate: Date;
    endDate: Date;
    student_id: string;
    coordinator_id: string;
    studyProgram_id: number;
    internship_id: number;
    comment: string;
    created_at: Date;
    updated_at: Date;
  }

  interface TimeIntervalTable {
    id: number;
    startTime: Date;
    endTime: Date;
    internship_id: number;
    created_at: Date;
    updated_at: Date;
  }
  interface Tables {
    employees: EmployeeTable;
    students: StudentTable;
    departments: DepartmentTable;
    sectionTypes: SectionType;
    sections: SectionTable;
    internshipFields: InternshipFieldTable;
    internships: InternshipTable;
    educationInstitutions: EducationInstitutionTable;
    studyPrograms: StudyProgramTable;
    internshipAgreements: InternshipAgreementTable;
    timeIntervals: TimeIntervalTable;
  }
}
