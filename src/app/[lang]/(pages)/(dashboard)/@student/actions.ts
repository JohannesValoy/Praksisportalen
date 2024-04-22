/** @format */

"use server";
import "server-only";
import { getUser } from "@/lib/auth";

export async function getStudent() {
  return getUser();
}
