"use server";
import {
  EducationInstitutionPageRequest,
  EducationInstitution,
} from "@/app/_models/EducationInstitution";
import { PageResponse } from "@/app/_models/pageinition";
import DBclient from "@/knex/config/DBClient";
import { EducationInstitutionTable } from "knex/types/tables.js";

/**
 * Gets an {@link EducationInstitution} object by its id.
 * @param id The id of the {@link EducationInstitution}.
 * @returns The {@link EducationInstitution} object.
 * @throws An error if no {@link EducationInstitution} is found with the given id.
 */
async function getEducationInstitutionByID(
  id: number,
): Promise<EducationInstitutionTable> {
  const institutes = await getEducationInstitutionByIDList(new Set([id]));
  if (!institutes.get(id)) {
    throw new Error("Education Institution not found");
  }
  return institutes.get(id);
}

/**
 * A list of {@link EducationInstitution} objects by their ids.
 * @param idList A list of ids to fetch.
 * @returns A map of {@link EducationInstitution} objects with the id as key.
 */
async function getEducationInstitutionByIDList(
  idList: Set<number>,
): Promise<Map<number, EducationInstitutionTable>> {
  const query = await DBclient.select()
    .from<EducationInstitutionTable>("educationInstitutions")
    .whereIn("id", Array.from(idList));
  const educationInstitutions: Map<number, EducationInstitutionTable> =
    new Map();
  for (const educationInstitution of query) {
    educationInstitutions.set(educationInstitution.id, {
      ...educationInstitution,
    });
  }
  return educationInstitutions;
}
/**
 * Gets a list of {@link EducationInstitution} objects by a {@link EducationInstitutionPageRequest}
 * @param pageRequest a {@link EducationInstitutionPageRequest}
 * @returns a {@link PageResponse} of {@link EducationInstitution}
 */
async function getEducationInstitutionsByPageRequest(
  pageRequest: EducationInstitutionPageRequest,
): Promise<PageResponse<EducationInstitution>> {
  const baseQuery = await DBclient.select("")
    .from<EducationInstitutionTable>("educationInstitutions")
    .where((builder) => {
      if (pageRequest.containsName != "" && pageRequest.containsName) {
        builder.where("name", "like", `%${pageRequest.containsName}%`);
      }
    })
    .orderBy(
      ["id", "name"].includes(pageRequest.sort) ? pageRequest.sort : "id",
    );
  const pageQuery = baseQuery.slice(
    pageRequest.page * pageRequest.size,
    (pageRequest.page + 1) * pageRequest.size,
  );
  return {
    ...pageRequest,
    elements: await createEducationInstitutionObject(pageQuery),
    totalElements: baseQuery.length,
    totalPages: Math.ceil(baseQuery.length / pageRequest.size),
  };
}

/**
 * Converts from a list of {@link EducationInstitutionTable} to a list of {@link EducationInstitution}
 * @param query a list of {@link EducationInstitutionTable}
 * @returns a list of {@link EducationInstitution}
 */
async function createEducationInstitutionObject(
  query: EducationInstitution[],
): Promise<EducationInstitution[]> {
  const educationInstitutions = [];
  query.forEach((educationInstitution) => {
    educationInstitutions.push({
      ...educationInstitution,
    });
  });
  return educationInstitutions;
}

/**
 * Deletes an education institution by its id
 * @param id the id of the education institution
 * @throws An error if the education institution is referenced by an internship agreement or if an error occurs while deleting the education institution
 */
async function deleteEducationInstitutionByID(id: number) {
  try {
    const deletedCount = await DBclient.delete()
      .from("educationInstitutions")
      .where("id", id);
    if (deletedCount === 0) {
      //TODO: The text in this error message is gonna be overwritten by the error message in the catch block. Either fix or ensure that the catch block is never reached
      throw new Error(`Education institution with id ${id} not found`);
    }
  } catch (error) {
    if (error.message.includes("foreign key constraint")) {
      throw new Error(
        `Cannot delete education institution because it is referenced by internship Agreements`,
      );
    }
    throw new Error(
      "An error occurred while deleting the education institution",
    );
  }
}

export {
  getEducationInstitutionByID,
  getEducationInstitutionByIDList,
  getEducationInstitutionsByPageRequest,
  createEducationInstitutionObject,
  deleteEducationInstitutionByID,
};
