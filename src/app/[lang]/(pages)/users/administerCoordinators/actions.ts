/** @format */

"use server";
import { CoordinatorPageRequest } from "@/app/_models/Coordinator";
import { getCoordinatorsByPageRequest } from "@/services/CoordinatorService";
import "server-only";

export async function paginateCoordinators(request: CoordinatorPageRequest) {
  return await getCoordinatorsByPageRequest(request);
}

export async function deleteCoordinator(id: number) {
  return await deleteCoordinatorByID(id);
}
