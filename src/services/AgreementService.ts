/** @format */

import {
  InternshipAgreement,
  InternshipAgreementPageRequest,
} from "@/app/_models/Agreement";
import { InternshipAgreementTable } from "knex/types/tables.js";
import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";
import DBclient from "@/knex/config/DBClient";
import { PageResponse } from "@/app/_models/pageinition";
import { z } from "zod";

import "server-only";
import { getInternshipPositionObjectByIDList } from "./InternshipPositionService";
import { getStudyProgramObjectByIDList } from "./StudyProgramService";
import DBClient from "@/knex/config/DBClient";

/**
 * Fetches a single {@link InternshipAgreement} by its ID.
 * @param id  The ID of the {@link InternshipAgreement}.
 * @returns  The {@link InternshipAgreement} object.
 * @throws  An error if the {@link InternshipAgreement} is not found.
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
 * Fetches multiple {@link InternshipAgreement} by their IDs.
 * @param idList An array of IDs.
 * @returns A {@link Map} of {@link InternshipAgreement} IDs to their corresponding objects.
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
 * Fetches Internship Agreements by {@link InternshipAgreementPageRequest}.
 * Filters and paginates the {@link InternshipAgreement}s based on the provided page request.
 * @param pageRequest {@link Page}.
 * @returns A {@link PageResponse} containing the requested page of {@link InternshipAgreement}.
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
        builder.where("internship_id", pageRequest.hasInternshipID);
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

/**
 * Fetches Internship Agreements by {@link InternshipPaginationRequest}.
 * @param internshipRequest  {@link InternshipPaginationRequest}
 * @returns  An array of {@link InternshipAgreement}.
 */
async function getInternshipAgreementsByInternshipRequest(
  internshipRequest: InternshipPaginationRequest
) {
  const internships = await DBclient("internships")
    .leftJoin(
      "internshipAgreements",
      "internships.id",
      "internshipAgreements.internship_id"
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
 * Converts a list of {@link InternshipAgreementTable} objects into a list of {@link InternshipAgreement}.
 * @param query A list of {@link InternshipAgreementTable} objects.
 * @returns A list of {@link InternshipAgreement}.
 */
async function createInternshipAgreementObject(
  query: InternshipAgreementTable[]
): Promise<InternshipAgreement[]> {
  const studyProgramsPromise = getStudyProgramObjectByIDList(
    query.map((agreement) => agreement.studyProgram_id)
  );
  const internshipsPromise = getInternshipPositionObjectByIDList(
    query.map((agreement) => agreement.internship_id)
  );
  const [studyPrograms, internships] = await Promise.all([
    studyProgramsPromise,
    internshipsPromise,
  ]);
  const objects: InternshipAgreement[] = [];
  for (const element of query) {
    objects.push({
      ...element,
      studyProgram: studyPrograms.get(element.studyProgram_id),
      internship: internships.get(element.internship_id),
    });
  }
  return objects;
}
const InternshipAgreementSchema = z.object({
  status: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  student_id: z.string().optional(),
  coordinator_id: z.string().optional(),
  studyProgram_id: z.number(),
  internship_id: z.number(),
  comment: z.string().optional(),
});
async function saveInternshipAgreementObject(
  agreement: InternshipAgreement
): Promise<string> {
  try {
    const validatedAgreement = InternshipAgreementSchema.parse(agreement);
    if (validatedAgreement.startDate > validatedAgreement.endDate) {
      throw new Error("Start date must be before end date");
    }
    let insertedAgreement;
    await DBclient.transaction(async () => {
      [insertedAgreement] = await DBClient.table("internshipAgreements")
        .insert(validatedAgreement)
        .returning("*");

      if (!insertedAgreement) {
        throw new Error("Failed to insert Internship Agreement");
      }
    });

    return "Internship Agreement successfully inserted";
  } catch (error) {
    console.error(error);
    return "Failed to insert Internship Agreement";
  }
}

/**
 * Deletes an a row in the {@link InternshipAgreementTable} by its ID.
 * @param id The ID of the {@link InternshipAgreement} to delete.
 */
async function deleteInternshipAgreementByID(id: number) {
  await DBclient.delete().from("internshipAgreements").where("id", id);
}

export {
  getInternshipAgreementObjectByID,
  getInternshipAgreementObjectByIDList,
  getInternshipAgreementsByPageRequest,
  getInternshipAgreementsByInternshipRequest,
  deleteInternshipAgreementByID,
  saveInternshipAgreementObject,
};
