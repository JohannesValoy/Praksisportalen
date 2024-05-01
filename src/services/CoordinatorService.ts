/** @format */
"use server";

import DBclient from "@/knex/config/DBClient";
import { CoordinatorTable } from "knex/types/tables.js";
import { encryptPassword } from "@/lib/auth";
import { Coordinator, CoordinatorPageRequest } from "@/app/_models/Coordinator";
import { PageResponse } from "@/app/_models/pageinition";
import { getEducationInstitutionByIDList } from "./EducationInstituteService";
import { EducationInstitution } from "@/app/_models/EducationInstitution";

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

async function getCoordinatorsByID(id: string): Promise<Coordinator> {
  const coordinators = await getCoordinatorsByIDList(new Set([id]));
  if (!coordinators.get(id)) {
    throw new Error("Coordinator not found");
  }
  return coordinators.get(id);
}

async function getCoordinatorsByIDList(
  idList: Set<string>,
): Promise<Map<string, Coordinator>> {
  const query = await DBclient.select()
    .from<CoordinatorTable>("coordinators")
    .whereIn("id", Array.from(idList));
  const coordinators: Map<string, Coordinator> = new Map();
  const educationInstitutionIDs = new Set(
    query.map((coordinator) => coordinator.educationInstitutionID),
  );
  const educationInstitutions = await getEducationInstitutionByIDList(
    educationInstitutionIDs,
  );
  for (const coordinator of query) {
    coordinators.set(coordinator.id, {
      ...coordinator,
      educationInstitution: educationInstitutions.get(
        coordinator.educationInstitutionID,
      ),
    });
  }
  return coordinators;
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

async function createCoordinatorObjects(
  query: CoordinatorTable[],
): Promise<Coordinator[]> {
  const coordinators: Coordinator[] = [];
  const educationInstitutions: Map<number, EducationInstitution> =
    await getEducationInstitutionByIDList(
      new Set(query.map((coordinator) => coordinator.educationInstitutionID)),
    );
  query.forEach((coordinator) => {
    coordinators.push({
      ...coordinator,
      educationInstitution: educationInstitutions.get(
        coordinator.educationInstitutionID,
      ),
    });
  });
  return coordinators;
}

async function deleteCoordinatorByID(id: number) {
  await DBclient.delete().from("coordinators").where("id", id);
}

export {
  createCoordinators,
  getCoordinatorsByID,
  getCoordinatorsByIDList,
  getCoordinatorsByPageRequest,
  deleteCoordinatorByID,
};
