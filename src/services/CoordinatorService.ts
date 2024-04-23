/** @format */

import DBclient from "@/knex/config/DBClient";
import { CoordinatorTable } from "knex/types/tables.js";
import { encryptPassword } from "@/lib/auth";
import { Coordinator, CoordinatorPageRequest } from "@/app/_models/Coordinator";
import { PageResponse } from "@/app/_models/pageinition";

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

async function createCoordinatorObjects(query: CoordinatorTable[]) {
  const coordinators: Coordinator[] = [];
  query.forEach((coordinator) => {
    coordinators.push({
      ...coordinator,
    });
  });
  return coordinators;
}

async function deleteCoordinatorByID(id: number) {
  await DBclient.delete().from("coordinators").where("id", id);
}

export {
  createCoordinators,
  getCoordinatorsByPageRequest,
  deleteCoordinatorByID,
};
