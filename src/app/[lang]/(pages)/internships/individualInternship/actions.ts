"use server";

import "server-only";
import DBClient from "@/knex/config/DBClient";
/**
 * Gets The intenship with the given id, the different agreements within it and the timeIntervals for it.
 * @param id The id of the internship.
 * @returns The internship with the given id, the different agreements within it
 * and all the timeIntervals within the internship.
 */
export async function getIndividualInternship(id: number) {
  const intern = await DBClient.from("internships")
    .where({ id: id })
    .select()
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
    //TODO; TimeIntervals has no meaning within internship, it should be a part of the agreement
    agreements,
    timeIntervals,
  };
}
