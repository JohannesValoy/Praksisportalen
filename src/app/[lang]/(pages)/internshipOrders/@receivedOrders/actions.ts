"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";
export interface Order {
  id: number;
  studyProgram_id: number;
  internshipField: string;
  studyYear: number;
  comment: Text;
  numStudents: number;
  startWeek: string;
  endWeek: string;
  created_at: Date;
  studyProgram: {
    id: number;
    name: string;
    educationInstitute: {
      id: number;
      name: string;
    };
  };
}
/**
 * Fetches ****ALL**** the orders from the databases and creates a list of {@link Order}s.
 * @returns A list of ****ALL**** the orders.
 */
export async function fetchOrders(): Promise<Order[]> {
  const orders = await DBclient.table("internshipOrders")
    .innerJoin(
      "fieldGroups",
      "internshipOrders.id",
      "fieldGroups.internshipOrder_id",
    )
    .innerJoin(
      "subFieldGroups",
      "fieldGroups.id",
      "subFieldGroups.fieldGroup_id",
    )
    .select("*");
  const studyprograms = await DBclient.table("studyPrograms")
    .whereIn(
      "studyPrograms.id",
      orders.map((order) => order.studyProgram_id),
    )
    .select();
  const educationInstitutes = await DBclient.table("educationInstitutions")
    .select()
    .whereIn(
      "id",
      studyprograms.map((studyprogram) => studyprogram.educationInstitution_id),
    );
  const response = orders.map((order) => {
    const studyprogram = studyprograms.find(
      (studyprogram) => studyprogram.id === order.studyProgram_id,
    );
    return {
      ...order,
      studyProgram: {
        ...studyprogram,
        educationInstitute: {
          ...educationInstitutes.find(
            (institue) => institue.id === studyprogram.educationInstitution_id,
          ),
        },
      },
    };
  });
  return response;
}
