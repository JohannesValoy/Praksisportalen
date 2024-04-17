import { EmployeeTable } from "knex/types/tables.js";
import { PageRequest } from "./pageinition";
import { Role } from "../api/auth/[...nextauth]/nextauth";

export interface EmployeePaginationRequest extends PageRequest {
  containsName?: string;
  containsEmail?: string;
  hasRole?: Role[];
}

export interface Employee extends EmployeeTable {}
