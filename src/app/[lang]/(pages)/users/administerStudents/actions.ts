/** @format */

"use server";
import { StudentPageRequest } from "@/app/_models/Student";
import { getStudentsByPageRequest } from "@/services/Student";
import "server-only";

export async function paginateStudents(request: StudentPageRequest) {
  return (await getStudentsByPageRequest(request)).toJSON();
}
