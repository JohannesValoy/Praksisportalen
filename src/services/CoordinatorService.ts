import DBclient from "@/knex/config/DBClient";
import { CoordinatorTable } from "knex/types/tables.js";
import { encryptPassword } from "@/lib/auth";
import { Coordinator, CoordinatorPageRequest } from "@/app/_models/Coordinator";
import { PageResponse } from "@/app/_models/pageinition";
/**
 * Inserts a list of {@link CoordinatorTable} objects into the database. Also encrypts the password.
 * @param coordinators A list of {@link CoordinatorTable} objects.
 */
async function createCoordinators(coordinators: CoordinatorTable[]) {
  const encryptions: Promise<void>[] = [];
  coordinators.forEach((coordinator) => {
    const promise = async () => {
      coordinator.password = await encryptPassword(coordinator.password);
    };
    encryptions.push(promise());
  });
  await Promise.all(encryptions);
  await DBclient.insert(coordinators).into("coordinators");
}
/**
 * Gets a {@link PageResponse} of {@link Coordinator} objects by a {@link CoordinatorPageRequest}
 * @param pageRequest a {@link CoordinatorPageRequest}
 * @returns a {@link PageResponse} of {@link Coordinator}
 */
async function getCoordinatorsByPageRequest(
  pageRequest: CoordinatorPageRequest,
) {
  const baseQuery = await DBclient.select("")
    .from("coordinators")
    .where((builder) => {
      if (pageRequest.containsName) {
        builder.where("name", "like", `%${pageRequest.containsName}%`);
      }
    })
    .orderBy(
      ["id", "name", "email"].includes(pageRequest.sort)
        ? pageRequest.sort
        : "id",
    );
  const pageQuery = baseQuery.slice(
    pageRequest.page * pageRequest.size,
    (pageRequest.page + 1) * pageRequest.size,
  );
  return {
    ...pageRequest,
    elements: await createCoordinatorObjects(pageQuery),
    totalElements: baseQuery.length,
    totalPages: Math.ceil(baseQuery.length / pageRequest.size),
  } as PageResponse<Coordinator>;
}
/**
 * Converts from a list of {@link CoordinatorTable} to a list of {@link Coordinator}
 * @param query a list of {@link CoordinatorTable}
 * @returns a list of {@link Coordinator}
 */
async function createCoordinatorObjects(query: CoordinatorTable[]) {
  const coordinators: Coordinator[] = [];
  query.forEach((coordinator) => {
    coordinators.push({
      ...coordinator,
    });
  });
  return coordinators;
}

/**
 * Deletes a {@link Coordinator} by its ID
 * @param id the ID of the {@link Coordinator} to delete
 */
async function deleteCoordinatorByID(id: number) {
  await DBclient.delete().from("coordinators").where("id", id);
}

export {
  createCoordinators,
  getCoordinatorsByPageRequest,
  deleteCoordinatorByID,
};
