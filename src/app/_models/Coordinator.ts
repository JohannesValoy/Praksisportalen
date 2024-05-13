import {
  CoordinatorTable,
  EducationInstitutionTable,
} from "knex/types/tables.js";
import { PageRequest } from "./pageinition";

/**
 * CoordinatorPageRequest is a interface that represents a request for a paginated list of Coordinator objects.
 * It should be used when you want to get a list of Coordinator objects from the server.
 */
export interface CoordinatorPageRequest extends PageRequest {
  containsName?: string;
  containsEmail?: string;
}

/**
 * A interface representing a Coordinator
 */
export interface Coordinator extends CoordinatorTable {
  educationInstitution: EducationInstitutionTable;
}
