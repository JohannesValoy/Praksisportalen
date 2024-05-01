/** @format */
//DO NOT REMOVE THE FOLLOWING IMPORT, IT IS NEEDED FOR TYPE DECLARATIONS
import { Knex } from "knex";

declare module "knex/types/tables.js" {
  interface UserAttributes {
    id?: string;
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  interface EmployeeTable extends UserAttributes {
    role: string;
    password: string;
  }

  interface StudentTable extends UserAttributes {
    educationInstitutionID: number;
  }

  interface CoordinatorTable extends UserAttributes {
    password: string;
    educationInstitutionID: number;
  }

  interface UsersView extends UserAttributes {
    role: string;
  }
  interface DepartmentTable {
    id: number;
    name: string;
    employeeID?: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface SectionType {
    name: string;
  }

  interface SectionTable {
    id: number;
    name: string;
    sectionType: string;
    employeeID?: string;
    departmentID: number;
    createdAt: Date;
    updatedAt: Date;
  }

  interface InternshipFieldTable {
    name: string;
  }

  interface InternshipTable {
    id: number;
    name: string;
    internshipField: string;
    maxCapacity: number;
    currentCapacity: number;
    numberOfBeds: number;
    yearOfStudy: number;
    sectionID: number;
    createdAt: Date;
    updatedAt: Date;
  }

  interface EducationInstitutionTable {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface StudyProgramTable {
    id: number;
    name: string;
    educationInstitutionID: number;
    createdAt: Date;
    updatedAt: Date;
  }

  interface InternshipAgreementTable {
    id: number;
    status: string;
    startDate: Date;
    endDate: Date;
    studentID: string;
    coordinatorID: string;
    studyProgramID: number;
    internshipID: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
  }
  interface InternshipOrdersTable {
    id: number;
    studyProgramID: number;
    comment: string;
    createdAt: Date;
  }

  interface FieldGroupTable {
    id: number;
    internshipField: string;
    internshipOrderID: number;
  }

  interface SubFieldGroupTable {
    id: number;
    studyYear: number;
    numStudents: number;
    startWeek: Date;
    endWeek: Date;
    fieldGroupID: number;
  }

  interface TimeIntervalTable {
    id: number;
    startDate: Date;
    endDate: Date;
    internshipAgreementID: number;
    createdAt: Date;
    updatedAt: Date;
  }
  interface Tables {
    employees: EmployeeTable;
    coordinators: CoordinatorTable;
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
    users: UsersView;
    subFieldGroups: SubFieldGroupTable;
    fieldGroups: FieldGroupTable;
    internshipOrders: InternshipOrdersTable;
  }
}
