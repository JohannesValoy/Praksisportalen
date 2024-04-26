"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

export async function fetchInternships() {
  const response = await DBclient("internships").select("*");

  return response.map((internship) => {
    return {
      name: internship.name,
    };
  }, {});
}

export async function fetchInternshipFields() {
  const response = await DBclient("internshipFields").select("*");

  return response.map((internshipField) => {
    return {
      name: internshipField.name,
    };
  }, {});
}

export async function fetchSections() {
  const response = await DBclient("sections").select("*");

  return response.map((section) => {
    return {
      name: section.name,
      id: section.id,
    };
  }, {});
}

export async function createInternshipField(data) {
  await DBclient("internshipFields").insert({
    name: data.name,
  });
  return null;
}

export async function createInternship(data) {
  await DBclient("internships").insert({
    name: data.name,
    section_id: data.sectionID,
    internshipField: data.internshipField,
    maxCapacity: data.maxCapacity,
    currentCapacity: data.currentCapacity,
    numberOfBeds: data.numberOfBeds,
    yearOfStudy: data.yearOfStudy,
  });
  return null;
}
