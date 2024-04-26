"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

export async function fetchStudents() {
  const response = await DBclient("students").select("*");

  return response.map((student) => {
    return {
      email: student.email,
    };
  }, {});
}

export async function createStudent(data) {
  await DBclient("students").insert({
    name: data.name,
    email: data.email,
  });
  return null;
}
