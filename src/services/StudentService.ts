/** @format */

import DBclient from "@/knex/config/DBClient";
import { randomUUID } from "crypto";
import { StudentTable } from "knex/types/tables.js";
import { PageResponse } from "../app/_models/pageinition";
import { Student, StudentPageRequest } from "@/app/_models/Student";

async function createStudent(student: StudentTable) {
  if (!student.id) {
    student.id = randomUUID();
  }
  await DBclient.insert(student).into("students");
}

async function createStudents(students: StudentTable[]) {
  const missingUUID = students.filter((student) => !student.id);
  missingUUID.forEach((student) => {
    student.id = randomUUID();
  });
  await DBclient.insert(students).into("students");
}

async function getStudentsByPageRequest(pageRequest: StudentPageRequest) {
  const baseQuery = await DBclient.select("*")
    .from("students")
    .where((builder) => {
      if (pageRequest.hasEmail) {
        builder.where("name", "like", `%${pageRequest.hasName}%`);
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
    elements: pageQuery,
    totalElements: baseQuery.length,
    totalPages: Math.ceil(baseQuery.length / pageRequest.size),
  } as PageResponse<Student>;
}

async function deleteStudentByID(id: string) {
  await DBclient.delete().from("students").where("id", id);
}

export {
  createStudent,
  createStudents,
  getStudentsByPageRequest,
  deleteStudentByID,
};
