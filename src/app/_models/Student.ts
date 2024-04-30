import { StudentTable } from "knex/types/tables.js";
import { PageRequest } from "./pageinition";

export interface Student extends StudentTable {}

export interface StudentPageRequest extends PageRequest {
  hasName: string;
  hasEmail: string;
}
