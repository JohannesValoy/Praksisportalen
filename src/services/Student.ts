import DBclient from "@/knex/config/DBClient";
import { encodeID } from "@/lib/auth";
import {StudentTable } from "knex/types/tables.js";

async function createStudent(student : StudentTable) {
    student.id = await encodeID(student.email, student.name);
    await DBclient.insert(student).into("students");
}

async function createStudents(students : StudentTable[]) {
    for (const student of students) {
        await createStudent(student);
    }
}

export { createStudent, createStudents}