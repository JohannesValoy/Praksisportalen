import { InternshipTable } from "knex/types/tables.js";
import { PageRequest } from "./pageinition";

/**
 * InternshipPaginationRequest is a interface that represents a request for a paginated list of Internship objects.
 * It should be used when you want to get a list of Internship objects from the server.
 */
export interface InternshipPaginationRequest extends PageRequest {
  sectionID?: number;
  yearOfStudy?: number[];
  vacancyStartDate?: Date;
  vacancyEndDate?: Date;
  field?: string;
  id?: number;
}

/**
 * Internship is a interface that represents an Internship object.
 */
export interface Internship extends InternshipTable {}
