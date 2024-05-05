"use server";
import { StudentPageRequest } from "@/app/_models/Student";
import {
  deleteStudentByID,
  getStudentsByPageRequest,
} from "@/services/StudentService";
import "server-only";
/**
 * Fetches a single {@link Student} by its ID.
 * @param request The ID of the {@link Student}.
 * @returns The {@link Student} object.
 */
export async function paginateStudents(request: StudentPageRequest) {
  return await getStudentsByPageRequest(request);
}
/**
 * Deletes a {@link Student} by its ID
 * @param id the ID of the {@link Student} to delete
 * @returns The deleted {@link Student} object.
 */
export async function deleteStudent(id: string) {
  return await deleteStudentByID(id);
}
