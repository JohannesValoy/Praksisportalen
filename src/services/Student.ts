import DBclient from "@/knex/config/DBClient";
import { randomUUID } from "crypto";
import { StudentTable } from "knex/types/tables.js";

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

export { createStudent, createStudents };
