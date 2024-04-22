"use server";
import DBclient from "@/knex/config/DBClient";
import "server-only";

export async function createRecord(tableName, data) {
  const newRecord = await DBclient.table(tableName).insert(data);
  return newRecord;
}
