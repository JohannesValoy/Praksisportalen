/** @format */

"use server";

import "server-only";
import DBClient from "@/knex/config/DBClient";

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
    agreements,
    timeIntervals,
  };
}
