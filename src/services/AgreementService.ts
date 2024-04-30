/** @format */

import {
  InternshipAgreement,
  InternshipAgreementPageRequest,
} from "@/app/_models/Agreement";
import { InternshipAgreementTable } from "knex/types/tables.js";
import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";
import DBclient from "@/knex/config/DBClient";
import { PageResponse } from "@/app/_models/pageinition";

import "server-only";
import { getInternshipPositionObjectByIDList } from "./InternshipPositionService";
import { getStudyProgramObjectByIDList } from "./StudyProgramService";

/**
 * Fetches an Internship Agreement object by its ID.
 * Throws an error if the agreement is not found.
 * @param id The ID of the internship agreement.
 * @returns A promise resolving to the Internship Agreement object.
 */
async function getInternshipAgreementObjectByID(
  id: number
): Promise<InternshipAgreement> {
  const agreementMap = await getInternshipAgreementObjectByIDList([id]);
  if (!agreementMap.has(id)) {
    throw new Error("Internship Agreement not found");
  }
  return agreementMap.get(id);
}

/**
 * Fetches multiple Internship Agreement objects by their IDs.
 * @param idList An array of Internship Agreement IDs.
 * @returns A map of Internship Agreement IDs to their corresponding objects.
 */
async function getInternshipAgreementObjectByIDList(
  idList: number[]
): Promise<Map<number, InternshipAgreement>> {
  const query = await DBclient.select()
    .from<InternshipAgreementTable>("internshipAgreements")
    .whereIn("id", idList);
  const agreements: Map<number, InternshipAgreement> = new Map();
  await createInternshipAgreementObject(query).then((agreementObjects) => {
    agreementObjects.forEach((agreement) => {
      agreements.set(agreement.id, agreement);
    });
  });
  return agreements;
}

/**
 * Fetches Internship Agreements by page request.
 * Filters and paginates the agreements based on the provided page request.
 * @param pageRequest Configuration for pagination and filtering.
 * @returns A PageResponse containing the requested page of Internship Agreements.
 */
async function getInternshipAgreementsByPageRequest(
  pageRequest: InternshipAgreementPageRequest
): Promise<PageResponse<InternshipAgreement>> {
  const pageSize = pageRequest.size; // Number of items per page
  const offset = pageRequest.page * pageSize; // Calculate the offset

  const baseQuery = await DBclient.select("")
    .from<InternshipAgreementTable>("internshipAgreements")
    .where((builder) => {
      if (pageRequest.hasInternshipID) {
        builder.where("internshipID", pageRequest.hasInternshipID);
      }
      if (pageRequest.containsStatus) {
        builder.where("status", "like", `%${pageRequest.containsStatus}%`);
      }
    })
    .orderBy(
      ["id", "startDate", "endDate"].includes(pageRequest.sort)
        ? pageRequest.sort
        : "id"
    );

  pageRequest.page = pageRequest.page || 0;
  pageRequest.size = pageRequest.size || 10;

  // Fetch the paginated results
  const paginatedResults = baseQuery.slice(offset, offset + pageSize);

  // Create Internship Agreement objects from the query results
  const internshipAgreements =
    await createInternshipAgreementObject(paginatedResults);
  return {
    page: pageRequest.page,
    size: pageSize,
    sort: pageRequest.sort,
    elements: internshipAgreements,
    totalElements: baseQuery.length,
    totalPages: Math.ceil(baseQuery.length / pageSize),
  };
}
async function getInternshipAgreementsByInternshipRequest(
  internshipRequest: InternshipPaginationRequest
) {
  console.log("internshipRequest: " + JSON.stringify(internshipRequest));
  const internships = await DBclient("internships")
    .leftJoin(
      "internshipAgreements",
      "internships.id",
      "internshipAgreements.internshipID"
    )
    .select("internships.*")
    .count("internshipAgreements.id as internshipAgreementCount")
    .groupBy("internships.id")
    .then((rows) => {
      return rows.map((row) => ({
        ...row,
        availablePlaces: row.currentCapacity - row.internshipAgreementCount,
      }));
    });
  return internships;
}

/**
 * Creates Internship Agreement objects from database query results.
 * @param query Result of the database query.
 * @returns An array of Internship Agreement objects.
 */
async function createInternshipAgreementObject(
  query: InternshipAgreementTable[]
): Promise<InternshipAgreement[]> {
  const studyProgramsPromise = getStudyProgramObjectByIDList(
    query.map((agreement) => agreement.studyProgramID)
  );
  const internshipsPromise = getInternshipPositionObjectByIDList(
    query.map((agreement) => agreement.internshipID)
  );
  const [studyPrograms, internships] = await Promise.all([
    studyProgramsPromise,
    internshipsPromise,
  ]);
  const objects: InternshipAgreement[] = [];
  for (const element of query) {
    objects.push({
      ...element,
      studyProgram: studyPrograms.get(element.studyProgramID),
      internship: internships.get(element.internshipID),
    });
  }
  return objects;
}

async function deleteInternshipAgreementByID(id: number) {
  await DBclient.delete().from("internshipAgreements").where("id", id);
}

export {
  getInternshipAgreementObjectByID,
  getInternshipAgreementObjectByIDList,
  getInternshipAgreementsByPageRequest,
  getInternshipAgreementsByInternshipRequest,
  deleteInternshipAgreementByID,
};
