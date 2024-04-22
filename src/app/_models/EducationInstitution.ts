/** @format */

import { EducationInstitutionTable } from "knex/types/tables.js";
import { PageRequest } from "./pageinition";

export interface EducationInstitutionPageRequest extends PageRequest {
  containsName?: string;
}

export interface EducationInstitution extends EducationInstitutionTable {}
