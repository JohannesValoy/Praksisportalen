/** @format */

import {
  EmployeeTable,
  InternshipTable,
  SectionTable,
} from "knex/types/tables.js";
import { PageRequest } from "./pageinition";

/**
 * A class representing a Section
 */
export interface Section extends SectionTable {
  department_id: number;
  employee?: EmployeeTable;
  internships: InternshipTable[];
}
/**
 * SectionPageRequest is a class that represents a request for a paginated list of Section objects.
 * It should be used when you want to get a list of Section objects from the server.
 */
export interface SectionPageRequest extends PageRequest {
  hasEmployeeID?: number;
  Department?: number;
  containsName?: string;
  department_id?: number;
}
