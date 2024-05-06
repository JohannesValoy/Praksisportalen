import { EmployeeTable } from "knex/types/tables.js";
import { PageRequest } from "./pageinition";
import { Role } from "../api/auth/[...nextauth]/nextauth";

/**
 * EmployeePageRequest is a class that represents a request for a paginated list of Employee objects.
 * It should be used when you want to get a list of Employee objects from the server.
 */
export interface EmployeePaginationRequest extends PageRequest {
  containsName?: string;
  containsEmail?: string;
  hasRole?: Role[];
}

/**
 * A class representing an Employee
 */
export interface Employee extends EmployeeTable {}
