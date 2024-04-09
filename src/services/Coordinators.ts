import DBclient from "@/knex/config/DBClient";
import { CoordinatorTable } from "knex/types/tables.js";
import { encodeID, encryptPassword } from "@/lib/auth";

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

export { createCoordinator, createCoordinators };
