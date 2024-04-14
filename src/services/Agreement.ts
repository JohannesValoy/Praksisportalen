/** @format */

import InternshipAgreementObject, {
  InternshipAgreementPageRequest,
} from "@/app/_models/Agreement";
import { InternshipAgreementTable } from "knex/types/tables.js";
import StudyProgramObject from "@/app/_models/StudyProgram";
import InternshipPositionObject, {
  InternshipPaginationRequest,
} from "@/app/_models/InternshipPosition";
import DBclient from "@/knex/config/DBClient";
import { PageResponse } from "@/app/_models/pageinition";

import "server-only";
import { getInternshipPositionObjectByIDList } from "./InternshipPosition";
import { getStudyProgramObjectByIDList } from "./StudyProgram";

/**
 * Fetches an Internship Agreement object by its ID.
 * Throws an error if the agreement is not found.
 * @param id The ID of the internship agreement.
 * @returns A promise resolving to the Internship Agreement object.
 */
async function getInternshipAgreementObjectByID(
  id: number,
): Promise<InternshipAgreementObject> {
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
  idList: number[],
): Promise<Map<number, InternshipAgreementObject>> {
  const query = await DBclient.select()
    .from<InternshipAgreementTable>("internshipAgreements")
    .whereIn("id", idList);
  const agreements: Map<number, InternshipAgreementObject> = new Map();
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
  pageRequest: InternshipAgreementPageRequest,
) {
  const pageSize = pageRequest.size; // Number of items per page
  const offset = pageRequest.page * pageSize; // Calculate the offset

  const baseQuery = DBclient.select()
    .from<InternshipAgreementTable>("internshipAgreements")
    .where((builder) => {
      if (pageRequest.hasInternshipID !== -1) {
        builder.where("internship_id", pageRequest.hasInternshipID);
      }
      if (pageRequest.containsStatus !== "") {
        builder.where("status", "like", `%${pageRequest.containsStatus}%`);
      }
    })
    .orderBy(pageRequest.sort);

  // Fetch the paginated results
  const paginatedResults = await baseQuery
    .limit(pageSize) // Limit the results to the page size
    .offset(offset); // Apply the offset

  // Optional: Fetch total count for pagination info (if needed)
  const totalCount = await DBclient.from<InternshipAgreementTable>(
    "internshipAgreements",
  )
    .where((builder) => {
      if (pageRequest.hasInternshipID !== -1) {
        builder.where("internship_id", pageRequest.hasInternshipID);
      }
      if (pageRequest.containsStatus !== "") {
        builder.where("status", "like", `%${pageRequest.containsStatus}%`);
      }
    })
    .count({ count: "*" }) // This counts the total number of filtered records
    .first();

  // Create Internship Agreement objects from the query results
  const internshipAgreements =
    await createInternshipAgreementObject(paginatedResults);

  return new PageResponse<InternshipAgreementObject>(
    pageRequest,
    internshipAgreements,
    parseInt(totalCount?.count || "0"), // Safe parsing of count
  );
}

/**
 * Returns a list of internships with available places based on the internship request.
 * @param internshipRequest
 * @returns internshipAgreements
 */
async function getInternshipAgreementsByInternshipRequest(
  internshipRequest: InternshipPaginationRequest,
) {
  const internships = await DBclient("internships")
    .leftJoin(
      "internshipAgreements",
      "internships.id",
      "internshipAgreements.internship_id",
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
  console.log(internships);
  return internships;
}

/**
 * Creates Internship Agreement objects from database query results.
 * @param query Result of the database query.
 * @returns An array of Internship Agreement objects.
 */
async function createInternshipAgreementObject(
  query: InternshipAgreementTable[],
): Promise<InternshipAgreementObject[]> {
  const studyProgramsPromise = getStudyProgramObjectByIDList(
    query.map((agreement) => agreement.studyProgram_id),
  );
  const internshipsPromise = getInternshipPositionObjectByIDList(
    query.map((agreement) => agreement.internship_id),
  );
  const [studyPrograms, internships] = await Promise.all([
    studyProgramsPromise,
    internshipsPromise,
  ]);
  return query.map(
    (agreement) =>
      new InternshipAgreementObject(
        agreement,
        studyPrograms.get(agreement.studyProgram_id),
        internships.get(agreement.internship_id),
      ),
  );
}

export {
  getInternshipAgreementObjectByID,
  getInternshipAgreementObjectByIDList,
  getInternshipAgreementsByPageRequest,
  getInternshipAgreementsByInternshipRequest,
};
