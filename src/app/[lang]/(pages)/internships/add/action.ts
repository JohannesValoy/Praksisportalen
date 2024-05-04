"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

/**
 * The fetchInternships function fetches all internships from the database.
 * @returns A list of internships.
 */
export async function fetchInternships() {
  return await DBclient("internships").select("name");
}

/**
 * The fetchInternshipFields function fetches all internship fields from the database.
 * @returns A list of internship fields.
 */
export async function fetchInternshipFields() {
  return await DBclient("internshipFields").select("name");
}

/**
 * The fetchSections function fetches all sections from the database.
 * @returns A list of sections.
 */
export async function fetchSections() {
  return await DBclient("sections").select("name", "id");
}

/**
 * The fetchYearsOfStudy function fetches all years of study from the database.
 * @param data the data of the new internship field.
 */
export async function createInternshipField(data) {
  await DBclient("internshipFields").insert({
    name: data.name,
  });
}

/**
 * The createInternship function creates a new internship in the database.
 * @param data The data of the new internship.
 */
export async function createInternship(data) {
  await DBclient("internships").insert({
    name: data.name,
    sectionID: data.sectionID,
    internshipField: data.internshipField,
    maxCapacity: data.maxCapacity,
    currentCapacity: data.currentCapacity,
    numberOfBeds: data.numberOfBeds,
    yearOfStudy: data.yearOfStudy,
  });
}
