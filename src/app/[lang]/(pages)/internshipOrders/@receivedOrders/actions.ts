/** @format */

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
export async function fetchOrders(): Promise<Order[]> {
  try {
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

    if (orders.length === 0) {
      throw new Error("No orders found in the internshipOrders table.");
    }

    const studyPrograms = await DBclient.table("studyPrograms")
      .whereIn(
        "studyPrograms.id",
        orders.map((order) => order.studyProgram_id)
      )
      .select();

    if (studyPrograms.length === 0) {
      throw new Error("No study programs found for the given orders.");
    }

    const educationInstitutes = await DBclient.table("educationInstitutions")
      .select()
      .whereIn(
        "id",
        studyPrograms.map(
          (studyProgram) => studyProgram.educationInstitution_id
        )
      );

    if (educationInstitutes.length === 0) {
      throw new Error(
        "No education institutions found for the given study programs."
      );
    }

    const response = orders.map((order) => {
      const studyProgram = studyPrograms.find(
        (studyProgram) => studyProgram.id === order.studyProgram_id
      );
      return {
        ...order,
        studyProgram: {
          ...studyProgram,
          educationInstitute: {
            ...educationInstitutes.find(
              (institute) =>
                institute.id === studyProgram.educationInstitution_id
            ),
          },
        },
      };
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
