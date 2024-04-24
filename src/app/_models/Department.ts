/** @format */

import { DepartmentTable, EmployeeTable } from "knex/types/tables.js";
import { PageRequest } from "./pageinition";
/**
 * A class representing a Department
 */
export interface Department extends DepartmentTable {
  employee?: EmployeeTable;
}

/**
 * DepartmentPageRequest is a class that represents a request for a paginated list of Department objects.
 * It should be used when you want to get a list of Department objects from the server.
 */
export interface DepartmentPageRequest extends PageRequest {
  hasEmployeeID?: number;
  hasSectionID?: number;
  containsName?: string;
}
