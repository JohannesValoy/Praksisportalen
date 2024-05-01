/** @format */
"use server";

import { InternshipTable } from "knex/types/tables.js";
import DBclient from "@/knex/config/DBClient";
import {
  Internship,
  InternshipPaginationRequest,
} from "@/app/_models/InternshipPosition";
import { PageResponse } from "@/app/_models/pageinition";
import "server-only";

/**
 * getInternshipPositionObjectByID returns an InternshipPositionObject object by id.
 * @param id The id of the InternshipPositionObject.
 * @returns A InternshipPositionObject object.
 * @throws Error if the InternshipPositionObject is not found.
 */
async function getInternshipPositionObjectByID(
  id: number,
): Promise<Internship> {
  const internship = await getInternshipPositionObjectByIDList([id]);
  if (internship.get(id) == undefined) {
    throw new Error("Internship Position not found");
  }
  return internship.get(id);
}
/**
 * getInternshipPositionObjectByIDList returns a map of InternshipPositionObject objects by id.
 * @param idList The list of id.
 * @returns  A Map object that contains the list of InternshipPositionObject objects.
 */
async function getInternshipPositionObjectByIDList(
  idList: number[],
): Promise<Map<number, Internship>> {
  const query = await DBclient.select()
    .from<InternshipTable>("internships")
    .whereIn("id", idList);
  const internships: Map<number, Internship> = new Map();
  query.forEach((internship) => {
    internships.set(internship.id, internship);
  });
  return internships;
}
/**
 * getInternshipPositionObjectBySectionID returns a map of InternshipPositionObject objects by sectionID.
 * @param sections  The list of sectionID.
 * @returns  A Map object that contains the list of InternshipPositionObject objects.
 */

async function getInternshipPositionObjectBySectionID(
  sections: number[],
): Promise<Map<number, Internship[]>> {
  const query = await DBclient.from<InternshipTable>("internships")
    .select("id", "sectionID")
    .whereIn("sectionID", sections);
  const internships = await getInternshipPositionObjectByIDList(
    query.map((internship) => internship.id),
  );
  const internshipsMap = new Map();
  query.forEach((internship) => {
    if (internshipsMap.has(internship.sectionID)) {
      internshipsMap
        .get(internship.sectionID)
        .push(internships.get(internship.id));
    } else {
      internshipsMap.set(internship.sectionID, [
        internships.get(internship.id),
      ]);
    }
  });
  return internshipsMap;
}

/**
 * getInternshipPositionObjectByPage returns a paginated list of InternshipPositionObject objects.
 * @param pageRequest  The request object that contains the page, size, sort, sectionID, yearOfStudy, and field.
 * @returns  A PageResponse object that contains the list of InternshipPositionObject objects.
 */
async function getInternshipPositionObjectByPageRequest(
  pageRequest: InternshipPaginationRequest,
): Promise<PageResponse<Internship>> {
  const query = await DBclient.select()
    .from<InternshipTable>("internships")
    .where((builder) => {
      if (pageRequest.sectionID && typeof pageRequest.sectionID == "number") {
        builder.whereIn("sectionID", pageRequest.sectionID);
      }
      if (pageRequest.yearOfStudy && pageRequest.yearOfStudy.length > 0) {
        builder.whereIn("yearOfStudy", pageRequest.yearOfStudy);
      }
      if (pageRequest.field) {
        builder.where("field", pageRequest.field);
      }
    })
    .orderBy(
      [
        "id",
        "name",
        "maxCapacity",
        "currentCapacity",
        "numberOfBeds",
        "yearOfStudy",
      ].includes(pageRequest.sort)
        ? pageRequest.sort
        : "id" || "name",
    );
  const internships: Internship[] = [];
  query
    .slice(
      pageRequest.size * pageRequest.page,
      pageRequest.size * pageRequest.page + pageRequest.size,
    )
    .forEach((internship) => {
      internships.push(internship);
    });
  return {
    ...pageRequest,
    elements: internships,
    totalElements: query.length,
    totalPages: Math.ceil(query.length / pageRequest.size),
  };
}

async function deleteInternshipByID(id: number): Promise<void> {
  await DBclient<InternshipTable>("internships").where("id", id).del();
}

export {
  getInternshipPositionObjectByID,
  getInternshipPositionObjectByIDList,
  getInternshipPositionObjectBySectionID,
  getInternshipPositionObjectByPageRequest,
  deleteInternshipByID,
};
