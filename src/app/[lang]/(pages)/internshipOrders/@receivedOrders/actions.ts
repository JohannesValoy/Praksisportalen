/** @format */

"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";
export interface Order {
  id: number;
  studyProgramID: number;
  internshipField: string;
  studyYear: number;
  comment: string;
  numStudents: number;
  startWeek: Date;
  endWeek: Date;
  createdAt: Date;
  studyProgram: {
    id: number;
    name: string;
    educationInstitute: {
      id: number;
      name: string;
    };
  };
}

export async function fetchOrders(): Promise<Order[]> {
  const orders = await DBclient.table("internshipOrders")
    .innerJoin(
      "fieldGroups",
      "internshipOrders.id",
      "fieldGroups.internshipOrderID"
    )
    .innerJoin(
      "subFieldGroups",
      "fieldGroups.id",
      "subFieldGroups.fieldGroupID"
    )
    .select("*");
  const studyPrograms = await DBclient.table("studyPrograms")
    .whereIn(
      "studyPrograms.id",
      orders.map((order) => order.studyProgramID)
    )
    .select();
  const educationInstitutes = await DBclient.table("educationInstitutions")
    .select()
    .whereIn(
      "id",
      studyPrograms.map((studyprogram) => studyprogram.educationInstitution_id)
    );
  const response = orders.map((order) => {
    const studyProgram = studyPrograms.find(
      (studyprogram) => studyprogram.id === order.studyProgramID
    );
    return {
      ...order,
      studyProgram: {
        ...studyProgram,
        educationInstitute: {
          ...educationInstitutes.find(
            (institue) => institue.id === studyProgram.educationInstitution_id
          ),
        },
      },
    };
  });
  return response;
}
