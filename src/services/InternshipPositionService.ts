import { InternshipTable } from "knex/types/tables.js";
import DBclient from "@/knex/config/DBClient";
import {
  Internship,
  InternshipPaginationRequest,
} from "@/app/_models/InternshipPosition";
import "server-only";
import { PageResponse } from "@/app/_models/pageinition";

/**
 * Gets an {@link InternshipPosition} object by its id.
 * @param id The id of the {@link InternshipPosition}.
 * @returns The {@link InternshipPosition} object.
 * @throws An error if no {@link InternshipPosition} is found with the given id.
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
 * Gets a list of {@link InternshipPosition} objects by their ids.
 * @param idList A list of ids to fetch.
 * @returns A map of {@link InternshipPosition} objects with the id as key.
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
 * Gets {@link InternShipPosition} as a map objects by section_id.
 * @param sections The list of section_id.
 * @returns  A {@link Map} where the key is the section_id and the value is the list of {@link InternshipPosition} objects.
 */
async function getInternshipPositionObjectBySectionID(
  sections: number[],
): Promise<Map<number, Internship[]>> {
  const query = await DBclient.from<InternshipTable>("internships")
    .select("id", "section_id")
    .whereIn("section_id", sections);
  const internships = await getInternshipPositionObjectByIDList(
    query.map((internship) => internship.id),
  );
  const internshipsMap = new Map();
  query.forEach((internship) => {
    if (internshipsMap.has(internship.section_id)) {
      internshipsMap
        .get(internship.section_id)
        .push(internships.get(internship.id));
    } else {
      internshipsMap.set(internship.section_id, [
        internships.get(internship.id),
      ]);
    }
  });
  return internshipsMap;
}

/**
 * Gets a  a paginated list of {@link InternshipObject} objects.
 * @param pageRequest  A {@link InternshipPaginationRequest} that contains
 * the page, size, sort, section_id, yearOfStudy, and field.
 * @returns  A {@link PageResponse} object that contains the list
 * of {@link InternshipPosition} objects.
 */
async function getInternshipPositionObjectByPageRequest(
  pageRequest: InternshipPaginationRequest,
): Promise<PageResponse<Internship>> {
  let query = DBclient.from("internships")
    .select(
      "*",
      pageRequest.startDate && pageRequest.endDate
        ? DBclient.raw(
            `availableInternshipsSpotsBetweenDates(internships.id, '${new Date(pageRequest.vacancyStartDate).toISOString().split("T")[0]}', '${new Date(pageRequest.vacancyStartDate).toISOString().split("T")[0]}') as vacancies`,
          )
        : DBclient.raw(
            "availableInternshipsSpots(internships.id) as vacancies",
          ),
    )
    .where((builder) => {
      if (pageRequest.section_id && typeof pageRequest.section_id == "number") {
        builder.whereIn("section_id", pageRequest.section_id);
      }
      if (
        Array.isArray(pageRequest.yearOfStudy) &&
        pageRequest.yearOfStudy.every(Number.isFinite) &&
        pageRequest.yearOfStudy.length > 0
      ) {
        builder.whereIn("yearOfStudy", pageRequest.yearOfStudy);
      }
      if (pageRequest.field) {
        builder.where("internship_field", pageRequest.field);
      }
    });

  if (pageRequest.sort === "vacancies") {
    query = query.orderBy("vacancies", "desc");
  } else {
    query = query.orderBy(
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
  }

  const internships: Internship[] = [];
  const results = await query;
  results
    .slice(
      pageRequest.size * pageRequest.page,
      pageRequest.size * pageRequest.page + pageRequest.size,
    )
    .forEach((result) => {
      internships.push(result);
    });
  return {
    ...pageRequest,
    elements: internships,
    totalElements: results.length,
    totalPages: Math.ceil(results.length / pageRequest.size),
  };
}
/**
 * Deletes an {@link InternshipTable}by id.
 * @param id The id of the {@link InternshipTable}.
 */
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
