"use server";
import "server-only";
import DBclient from "@/knex/config/DBClient";
import { getUser } from "@/lib/auth";

export async function getStudent() {
  return getUser();
}
