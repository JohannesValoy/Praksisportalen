import { StudentTable } from "knex/types/tables.js";
import { PageRequest } from "./pageinition";

export interface Student extends StudentTable {}

/* This code snippet is defining an interface named `StudentPageRequest` that extends another interface
`PageRequest`. The `StudentPageRequest` interface includes additional properties specific to a
student entity, such as `hasName`, `hasEmail`, and `educationInstitutionID`. By extending
`PageRequest`, the `StudentPageRequest` interface inherits properties and methods from the
`PageRequest` interface, making it easier to work with page requests related to student data. */
export interface StudentPageRequest extends PageRequest {
  hasName: string;
  hasEmail: string;
  educationInstitutionID: string;
}
