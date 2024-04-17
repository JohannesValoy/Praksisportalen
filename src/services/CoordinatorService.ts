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
  for (const coord of coordinators) {
    await createCoordinator(coord);
  }
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
    .orderBy(pageRequest.sort);
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

export { createCoordinator, createCoordinators, getCoordinatorsByPageRequest };
