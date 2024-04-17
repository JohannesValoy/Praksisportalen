/** @format */

import DBclient from "@/knex/config/DBClient";
import { randomUUID } from "crypto";
import { StudentTable } from "knex/types/tables.js";
import { PageRequest, PageResponse } from "../app/_models/pageinition";
import { StudentPageRequest } from "@/app/_models/Student";

async function createStudent(student: StudentTable) {
  if (!student.id) {
    student.id = randomUUID();
  }
  await DBclient.insert(student).into("students");
}

async function createStudents(students: StudentTable[]) {
  for (const student of students) {
    await createStudent(student);
  }
}

async function getStudentsByPageRequest(pageRequest: StudentPageRequest) {
  const baseQuery = await DBclient.select("*")
    .from("students")
    .where((builder) => {
      if (pageRequest.name) {
        builder.where("name", "like", `%${pageRequest.name}%`);
      }
    })
    .orderBy(pageRequest.sort);
  const pageQuery = baseQuery.slice(
    pageRequest.page * pageRequest.size,
    (pageRequest.page + 1) * pageRequest.size,
  );
  return new PageResponse<StudentTable>(
    pageRequest,
    pageQuery,
    baseQuery.length,
  );
}

export { createStudent, createStudents, getStudentsByPageRequest };
