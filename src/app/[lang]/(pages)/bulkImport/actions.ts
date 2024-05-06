"use server";
import DBclient from "@/knex/config/DBClient";
import { createCoordinators } from "@/services/CoordinatorService";
import { createEmployees } from "@/services/EmployeeService";
import { CoordinatorTable, EmployeeTable } from "knex/types/tables.js";
import "server-only";

/**
 * Inserts a record in the database based upon the tableName and data. Filters the data based upon the columns in the table.
 * @param tableName The name of the table to insert the record into.
 * @param data The data to insert into the table.
 * @returns The data that was inserted into the table.
 */
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
  try {
    switch (tableName) {
      case "coordinators":
        await createCoordinators([validData as CoordinatorTable]);
        break;
      case "employees":
        await createEmployees([validData as EmployeeTable]);
        break;
      default:
        await DBclient(tableName).insert(validData);
        break;
    }
    return validData;
  } catch (error) {
    throw new Error(
      error.message.substring(error.message.lastIndexOf("-") + 2),
    );
  }
}
