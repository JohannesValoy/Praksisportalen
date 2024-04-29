/** @format */

"use server";

import "server-only";
import DBClient from "@/knex/config/DBClient";

export async function getIndividualInternship(id: number) {
  const intern = await DBClient.from("internships")
    .where({ id: id })
    .select()
    .first();

  const section = await DBClient.from("sections")
    .where({ id: intern.section_id })
    .select("name")
    .first();

  const agreements = await DBClient.from("internshipAgreements").where(
    "internship_id",
    id,
  );
  const timeIntervals = await DBClient.table("timeIntervals").whereIn(
    "internshipAgreement_id",
    agreements.map((agreement) => agreement.id),
  );

  return {
    ...intern,
    sectionName: section.name,
    agreements,
    timeIntervals,
  };
}

export async function editDetails(id: number, update: any) {
  await DBClient.from("internships").where({ id }).update(update);
}
