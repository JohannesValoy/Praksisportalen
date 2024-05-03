"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

/**
 * The fetchInternships function fetches all internships from the database.
 * @returns A list of internships.
 */
export async function fetchInternships() {
  const response = await DBclient("internships").select("*");

  return response.map((internship) => {
    return {
      name: internship.name,
    };
  }, {});
}

/**
 * The fetchInternshipFields function fetches all internship fields from the database.
 * @returns A list of internship fields.
 */
export async function fetchInternshipFields() {
  const response = await DBclient("internshipFields").select("*");

  return response.map((internshipField) => {
    return {
      name: internshipField.name,
    };
  }, {});
}

/**
 * The fetchSections function fetches all sections from the database.
 * @returns A list of sections.
 */
export async function fetchSections() {
  const response = await DBclient("sections").select("*");

  return response.map((section) => {
    return {
      name: section.name,
      id: section.id,
    };
  }, {});
}

/**
 * The fetchYearsOfStudy function fetches all years of study from the database.
 * @returns A list of years of study.
 */
export async function createInternshipField(data) {
  await DBclient("internshipFields").insert({
    name: data.name,
  });
  return null;
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
  return null;
}
