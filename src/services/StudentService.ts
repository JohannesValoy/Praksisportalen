"use server";

import DBclient from "@/knex/config/DBClient";
import { StudentTable } from "knex/types/tables.js";
import { PageResponse } from "../app/_models/pageinition";
import { Student, StudentPageRequest } from "@/app/_models/Student";
/**
 * Inserts a list of students into the database
 * @param students a list of {@link StudentTable} students to insert
 */
async function createStudents(students: StudentTable[]) {
  await DBclient.insert(students).into("students");
}
/**
 * Fetches a page of students based on the page request
 * @param pageRequest A {@link StudentPageRequest}
 * @returns a {@link PageResponse} of {@link Student}
 */
async function getStudentsByPageRequest(pageRequest: StudentPageRequest) {
  const baseQuery = await DBclient.select("*")
    .from("students")
    .where((builder) => {
      if (pageRequest.hasEmail) {
        builder.where("name", "like", `%${pageRequest.hasName}%`);
      }
      if (pageRequest.educationInstitutionID) {
        builder.where(
          "educationInstitutionID",
          pageRequest.educationInstitutionID,
        );
      }
    })
    .orderBy(
      ["id", "name", "email"].includes(pageRequest.sort)
        ? pageRequest.sort
        : "id",
    );
  const pageQuery = baseQuery.slice(
    pageRequest.page * pageRequest.size,
    (pageRequest.page + 1) * pageRequest.size,
  );
  return {
    ...pageRequest,
    elements: pageQuery,
    totalElements: baseQuery.length,
    totalPages: Math.ceil(baseQuery.length / pageRequest.size),
  } as PageResponse<Student>;
}

/**
 * Fetches a list of students by internship id
 * @param id the id of the internship
 * @returns a list of students
 */
async function getStudentsByInternshipId(id: number) {
  const students = await DBclient.select("students.*")
    .from("students")
    .join(
      "internshipAgreements",
      "students.id",
      "internshipAgreements.studentID",
    )
    .where("internshipAgreements.internshipID", id);

  return { students } as { students: StudentTable[] };
}

/**
 * Deletes a student by its id
 * @param id the id of the student
 */
async function deleteStudentByID(id: string) {
  await DBclient.delete().from("students").where("id", id);
}

export {
  createStudents,
  getStudentsByPageRequest,
  deleteStudentByID,
  getStudentsByInternshipId,
};
