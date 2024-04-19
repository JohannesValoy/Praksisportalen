"use server";
import DBclient from "@/knex/config/DBClient";
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

  const newRecord = await DBclient.table(tableName).insert(validData);
  return newRecord;
}
