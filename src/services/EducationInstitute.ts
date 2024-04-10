/** @format */

import EducationInstitution from "@/app/_models/EducationInstitution";
import EducationInstitutionObject, {
  EducationInstitutionPageRequest,
} from "@/app/_models/EducationInstitution";
import { PageResponse } from "@/app/_models/pageinition";
import DBclient from "@/knex/config/DBClient";
import { EducationInstitutionTable } from "knex/types/tables.js";
import "server-only";

async function getEducationInstitutionByID(
  id: number
): Promise<EducationInstitutionObject> {
  const institute = (await getEducationInstitutionByIDList(new Set([id]))).get(
    id
  );
  if (institute == undefined) {
    throw new Error("Education Institution not found");
  }
  return institute[0];
}

async function getEducationInstitutionByIDList(
  idList: Set<number>
): Promise<Map<number, EducationInstitutionObject>> {
  const query = await DBclient.select()
    .from<EducationInstitutionTable>("educationInstitutions")
    .whereIn("id", Array.from(idList));
  const educationInstitutions: Map<number, EducationInstitutionObject> =
    new Map();
  for (const educationInstitution of query) {
    educationInstitutions.set(
      educationInstitution.id,
      new EducationInstitutionObject(educationInstitution)
    );
  }
  return educationInstitutions;
}

async function getEducationInstitutionsByPageRequest(
  pageRequest: EducationInstitutionPageRequest
) {
  const baseQuery = await DBclient.select("")
    .from<EducationInstitution>("educationInstitutions")
    .where((builder) => {
      if (pageRequest.containsName != "" && pageRequest.containsName) {
        builder.where("name", "like", `%${pageRequest.containsName}%`);
      }
    })
    .orderBy(pageRequest.sort);
  const pageQuery = baseQuery.slice(
    pageRequest.page * pageRequest.size,
    (pageRequest.page + 1) * pageRequest.size
  );
  return new PageResponse<EducationInstitutionObject>(
    pageRequest,
    await createEducationInstitutionObject(pageQuery),
    baseQuery.length
  );
}

async function createEducationInstitutionObject(
  query: EducationInstitution[]
): Promise<EducationInstitutionObject[]> {
  const educationInstitutions = [];
  query.forEach((educationInstitution) => {
    educationInstitutions.push(
      new EducationInstitutionObject(educationInstitution)
    );
  });
  return educationInstitutions;
}

export {
  getEducationInstitutionByID,
  getEducationInstitutionByIDList,
  getEducationInstitutionsByPageRequest,
};
