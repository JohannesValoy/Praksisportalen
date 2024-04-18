"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

export async function fetchOrders() {
  const orders = await DBclient.table("internshipOrders")
    .innerJoin(
      "fieldGroups",
      "internshipOrders.id",
      "fieldGroups.internshipOrder_id"
    )
    .innerJoin(
      "subFieldGroups",
      "fieldGroups.id",
      "subFieldGroups.fieldGroup_id"
    )
    .select("*");
  const response = orders.map((order) => {
    return { ...order };
  });
  console.log(response);
  return response;
}
