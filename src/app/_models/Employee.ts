import { EmployeeTable } from "knex/types/tables.js";
import { PageRequest } from "./pageinition";
import { Role } from "../api/auth/[...nextauth]/nextauth";

/* This code snippet is defining an interface named `EmployeePaginationRequest` in TypeScript. This
interface extends another interface `PageRequest` and adds additional properties to it. */
export interface EmployeePaginationRequest extends PageRequest {
  containsName?: string;
  containsEmail?: string;
  hasRole?: Role[];
}

export interface Employee extends EmployeeTable {}
