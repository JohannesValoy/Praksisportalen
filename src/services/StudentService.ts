"use server";

import DBclient from "@/knex/config/DBClient";
import { StudentTable } from "knex/types/tables.js";
import { PageResponse } from "../app/_models/pageinition";
import { Student, StudentPageRequest } from "@/app/_models/Student";
import { getEducationInstitutionByIDList } from "./EducationInstituteService";
import { EducationInstitution } from "@/app/_models/EducationInstitution";
/**
 * Inserts a list of students into the database
 * @param students a list of {@link StudentTable} students to insert
 */
async function createStudents(students: StudentTable[]) {
  await DBclient.insert(students).into("students");
}

/**
 * Gets a list of {@link Student} objects by their IDs
 * @param idList a list of IDs
 * @returns a map of {@link Student} objects
 */
async function getStudentsByIDList(
  idList: string[]
): Promise<Map<string, Student>> {
  const query = await DBclient.select()
    .from<StudentTable>("students")
    .whereIn("id", Array.from(idList));
  const students: Map<string, Student> = new Map();
  const educationInstitutionIDs = new Set(
    query.map((student) => student.educationInstitutionID)
  );
  const educationInstitutions = await getEducationInstitutionByIDList(
    educationInstitutionIDs
  );
  for (const student of query) {
    students.set(student.id, {
      ...student,
      educationInstitution: educationInstitutions.get(
        student.educationInstitutionID
      ),
    });
  }
  return students;
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
          pageRequest.educationInstitutionID
        );
      }
    })
    .orderBy(
      ["id", "name", "email"].includes(pageRequest.sort)
        ? pageRequest.sort
        : "id"
    );
  const pageQuery = baseQuery.slice(
    pageRequest.page * pageRequest.size,
    (pageRequest.page + 1) * pageRequest.size
  );
  return {
    ...pageRequest,
    elements: await createStudentObjects(pageQuery),
    totalElements: baseQuery.length,
    totalPages: Math.ceil(baseQuery.length / pageRequest.size),
  } as PageResponse<Student>;
}

/**
 * Converts from a list of {@link StudentTable} to a list of {@link Student}
 * @param query a list of {@link StudentTable}
 * @returns a list of {@link Student}
 */
async function createStudentObjects(query: StudentTable[]): Promise<Student[]> {
  const students: Student[] = [];
  const educationInstitutions: Map<number, EducationInstitution> =
    await getEducationInstitutionByIDList(
      new Set(query.map((student) => student.educationInstitutionID))
    );
  query.forEach((student) => {
    students.push({
      ...student,
      educationInstitution: educationInstitutions.get(
        student.educationInstitutionID
      ),
    });
  });
  return students;
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
      "internshipAgreements.studentID"
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
  getStudentsByIDList,
  deleteStudentByID,
  getStudentsByInternshipId,
};
