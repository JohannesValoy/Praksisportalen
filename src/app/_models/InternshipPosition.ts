import { InternshipTable } from "knex/types/tables.js";
import { PageRequest } from "./pageinition";

/**
 * InternshipPaginationRequest is a class that represents a request for a paginated list of Internship objects.
 * It should be used when you want to get a list of Internship objects from the server.
 */
export interface InternshipPaginationRequest extends PageRequest {
  sectionID?: number[];
  yearOfStudy?: number[];
  field?: string;
  id?: number;
}

export interface Internship extends InternshipTable {}
