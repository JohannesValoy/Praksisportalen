"use server";
import { CoordinatorPageRequest } from "@/app/_models/Coordinator";
import {
  deleteCoordinatorByID,
  getCoordinatorsByPageRequest,
} from "@/services/CoordinatorService";
import "server-only";
/**
 * Fetches a {@link PageResponse} with coordinators.
 * @param request The {@link CoordinatorPageRequest} object.
 * @returns A {@link PageResponse} object containing the list of {@link Coordinator} objects.
 */
export async function paginateCoordinators(request: CoordinatorPageRequest) {
  return await getCoordinatorsByPageRequest(request);
}
/**
 * Deletes a coordinator sby its ID
 * @param id The ID of the coordinator to delete.
 */
export async function deleteCoordinator(id: number) {
  await deleteCoordinatorByID(id);
}
