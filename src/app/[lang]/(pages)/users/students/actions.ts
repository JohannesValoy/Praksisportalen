/** @format */

"use server";
import { StudentPageRequest } from "@/app/_models/Student";
import {
  deleteStudentByID,
  getStudentsByPageRequest,
} from "@/services/StudentService";
import "server-only";

export async function paginateStudents(request: StudentPageRequest) {
  return await getStudentsByPageRequest(request);
}

export async function deleteStudent(id: string) {
  return await deleteStudentByID(id);
}
