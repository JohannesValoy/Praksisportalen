import DBclient from "@/knex/config/DBClient";
import { CoordinatorTable } from "knex/types/tables.js";
import { encodeID, encryptPassword } from "@/lib/auth";
import { Coordinator, CoordinatorPageRequest } from "@/app/_models/Coordinator";
import { PageResponse } from "@/app/_models/pageinition";

async function createCoordinator(coordinator: CoordinatorTable) {
  coordinator.id = await encodeID(coordinator.email, coordinator.name);
  coordinator.password = await encryptPassword(coordinator.password);
  await DBclient.insert(coordinator).into("coordinators");
}

async function createCoordinators(coordinators: CoordinatorTable[]) {
  for (const coord of coordinators) {
    await createCoordinator(coord);
  }
}

async function getCoordinatorsByPageRequest(
  pageRequest: CoordinatorPageRequest,
) {
  const baseQuery = await DBclient.select("")
    .from("coordinators")
    .where((builder) => {
      if (pageRequest.name) {
        builder.where("name", "like", `%${pageRequest.name}%`);
      }
    })
    .orderBy(pageRequest.sort);
  const pageQuery = baseQuery.slice(
    pageRequest.page * pageRequest.size,
    (pageRequest.page + 1) * pageRequest.size,
  );
  return new PageResponse<Coordinator>(
    pageRequest,
    await createCoordinatorObjects(pageQuery),
    baseQuery.length,
  );
}

async function createCoordinatorObjects(query: CoordinatorTable[]) {
  const coordinators: Coordinator[] = [];
  query.forEach((coordinator) => {
    coordinators.push(new Coordinator(coordinator));
  });
  return coordinators;
}

export { createCoordinator, createCoordinators, getCoordinatorsByPageRequest };
