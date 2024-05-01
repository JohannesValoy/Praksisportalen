"use server";
import "server-only";

("use server");
import DBclient from "@/knex/config/DBClient";
import { SectionTable } from "knex/types/tables.js";
import { getEmployeeObjectByIDList } from "./EmployeeService";
import { getInternshipPositionObjectBySectionID } from "./InternshipPositionService";
import { PageResponse } from "@/app/_models/pageinition";
import { Section, SectionPageRequest } from "@/app/_models/Section";
import { Employee } from "@/app/_models/Employee";
import { Internship } from "@/app/_models/InternshipPosition";
import "server-only";

/**
 * Fetches a {@link Section} by its id
 * @param id the id of the {@link Section}
 * @returns the {@link Section}
 */
async function getSectionObjectByID(id: number): Promise<Section> {
  const section = await getSectionObjectByIDList([id]);
  if (section.get(id) == undefined) {
    throw new Error("Section not found");
  }
  return section.get(id);
}
/**
 * Gets a list of {@link Section} objects by their ids
 * @param idList a list of ids to fetch
 * @returns a map of {@link Section} objects with the id as key. The map will only contain the {@link Section} objects that were found
 */
async function getSectionObjectByIDList(
  idList: number[]
): Promise<Map<number, Section>> {
  const query = await DBclient.select()
    .from<SectionTable>("sections")
    .whereIn("id", idList);
  const sections: Map<number, Section> = new Map();
  await createSectionObject(query).then((sectionObjects) => {
    sectionObjects.forEach((section) => {
      sections.set(section.id, section);
    });
  });
  return sections;
}
/**
 * Gets a list of {@link Section} objects by a {@link SectionPageRequest}
 * @param pageRequest a {@link SectionPageRequest}
 * @returns a {@link PageResponse} of {@link Section}
 */
async function getSectionsByPageRequest(
  pageRequest: SectionPageRequest
): Promise<PageResponse<Section>> {
  const baseQuery = await DBclient.select("")
    .from<SectionTable>("sections")
    .where((builder) => {
      if (pageRequest.hasEmployeeID) {
        builder.where("employeeID", pageRequest.hasEmployeeID);
      }
      if (pageRequest.departmentID) {
        builder.where("departmentID", pageRequest.departmentID);
      }
      if (pageRequest.containsName) {
        builder.where("name", "like", pageRequest.containsName);
      }
    })
    .orderBy(
      ["id", "name"].includes(pageRequest.sort) ? pageRequest.sort : "id"
    );
  //TODO: ^above add email from employees table

  pageRequest.page = pageRequest.page || 0;
  pageRequest.size = pageRequest.size || 10;
  const pageQuery = baseQuery.slice(
    pageRequest.page * pageRequest.size,
    (pageRequest.page + 1) * pageRequest.size
  );
  return {
    ...pageRequest,
    elements: await createSectionObject(pageQuery),
    totalElements: baseQuery.length,
    totalPages: Math.ceil(baseQuery.length / pageRequest.size),
  };
}
/**
 * Creates a list of {@link Section} objects from a list of {@link SectionTable} objects
 * @param query a list of {@link SectionTable} objects
 * @returns a list of {@link Section} objects
 */
async function createSectionObject(query: SectionTable[]): Promise<Section[]> {
  const employeesPromise: Promise<Map<string, Employee>> =
    getEmployeeObjectByIDList(query.map((section) => section.employeeID));
  const internshipsPromise: Promise<Map<number, Internship[]>> =
    getInternshipPositionObjectBySectionID(query.map((section) => section.id));
  const values = await Promise.all([employeesPromise, internshipsPromise]);
  const sections: Section[] = [];
  if (values.length != 2) {
    throw new Error("Error fetching section data");
  }
  const employees = values[0];
  const internships = values[1];
  query.forEach((section) => {
    sections.push({
      ...section,
      employee: employees?.get(section.employeeID),
      internships: internships?.get(section.id),
    });
  });
  return sections;
}
/**
 * Deletes a {@link Section} by its id
 * @param id the id of the {@link Section}
 * @returns the number of deleted sections
 */
async function deleteSectionByID(id: number) {
  return await DBclient.delete().from("sections").where("id", id);
}

export {
  getSectionObjectByID,
  getSectionObjectByIDList,
  getSectionsByPageRequest,
  deleteSectionByID,
};
