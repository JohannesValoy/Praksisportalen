"use server";
import DBclient from "@/knex/config/DBClient";
import { createCoordinators } from "@/services/CoordinatorService";
import { createEmployees } from "@/services/EmployeeService";
import { CoordinatorTable, EmployeeTable } from "knex/types/tables.js";
import "server-only";

export async function createRecord(tableName, data) {
  // Get column names for the table
  const columns = await DBclient(tableName).columnInfo();

  // Filter out invalid columns
  const validData = Object.keys(data)
    .filter((key) => key in columns)
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  switch (tableName) {
    case "coordinators":
      await createCoordinators([validData as CoordinatorTable]);
      break;
    case "employees":
      await createEmployees([validData as EmployeeTable]);
      break;
    default:
      DBclient(tableName).insert(validData);
      break;
  }
  return validData;
}
