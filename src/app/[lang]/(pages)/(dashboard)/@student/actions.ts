"use server";
import "server-only";
import { getUser } from "@/lib/auth";
/**
 * Gets the current user
 * @returns The current user
 */
//TODO: very misleading name, this function is not getting a student
export async function getStudent() {
  return getUser();
}
