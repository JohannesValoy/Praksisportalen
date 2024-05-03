"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

/**
 * The fetchStudents function fetches all students from the database.
 * @returns A list of students.
 */
export async function fetchStudents() {
  const response = await DBclient("students").select("*");

  return response.map((student) => {
    return {
      email: student.email,
    };
  }, {});
}

/**
 * The createStudent function adds a new student to the database.
 * @param data The student object to be added.
 */
export async function createStudent(data) {
  await DBclient("students").insert({
    name: data.name,
    email: data.email,
  });
}
