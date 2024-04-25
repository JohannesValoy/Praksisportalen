"use server";
import DBclient from "@/knex/config/DBClient";
import "server-only";

export async function fetchEducationInstitution() {
  const response = await DBclient("educationInstitutions").select("*");

  return response.map((edu) => {
    return {
      name: edu.name,
    };
  }, {});
}

export async function addEducationInstitution(data) {
  await DBclient("educationInstitutions").insert({ name: data });
  return null;
}
