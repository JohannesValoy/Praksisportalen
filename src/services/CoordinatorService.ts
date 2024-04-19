/** @format */

import DBclient from "@/knex/config/DBClient";
import { CoordinatorTable } from "knex/types/tables.js";
import { encryptPassword } from "@/lib/auth";
import { Coordinator, CoordinatorPageRequest } from "@/app/_models/Coordinator";
import { PageResponse } from "@/app/_models/pageinition";
import { randomUUID } from "crypto";

async function createCoordinator(coordinator: CoordinatorTable) {
  if (!coordinator.id) {
    coordinator.id = randomUUID();
  }
  coordinator.password = await encryptPassword(coordinator.password);
  await DBclient.insert(coordinator).into("coordinators");
}

async function createCoordinators(coordinators: CoordinatorTable[]) {
  const missingUUID = coordinators.filter((coordinator) => !coordinator.id);
  missingUUID.forEach((coordinator) => {
    coordinator.id = randomUUID();
  });
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
  pageRequest: CoordinatorPageRequest
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
        : "id"
    );
  const pageQuery = baseQuery.slice(
    pageRequest.page * pageRequest.size,
    (pageRequest.page + 1) * pageRequest.size
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
  createCoordinator,
  createCoordinators,
  getCoordinatorsByPageRequest,
  deleteCoordinatorByID,
};