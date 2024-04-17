import { CoordinatorTable } from "knex/types/tables.js";
import { PageRequest } from "./pageinition";

export interface CoordinatorPageRequest extends PageRequest {
  containsName?: string;
  containsEmail?: string;
}

export interface Coordinator extends CoordinatorTable {}
