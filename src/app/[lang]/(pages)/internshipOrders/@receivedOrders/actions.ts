/** @format */

"use server";

import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";
import {
  deleteInternshipByID,
  getInternshipPositionObjectByPageRequest,
} from "@/services/InternshipPositionService";
import DBclient from "@/knex/config/DBClient";
import "server-only";
import { getStudentsByInternshipId } from "@/services/StudentService";
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

export async function paginateInternships(
  request: InternshipPaginationRequest
) {
  request.section_id = [Number(request.section_id)] || [];
  request.yearOfStudy = [Number(request.yearOfStudy)] || [];
  const data = await getInternshipPositionObjectByPageRequest(request);

  const elementsPromises = data.elements.map(async (element) => {
    const result = await getStudentsByInternshipId(element.id);
    const students = result.students;
    return {
      name: element.name,
      field: element.internship_field,
      yearOfStudy: element.yearOfStudy,
      freeSpots: element.maxCapacity - students.length,
      id: element.id,
    };
  });

  const elements = await Promise.all(elementsPromises);

  return {
    ...data,
    elements,
  };
}
export async function deleteInternship(id: number) {
  return await deleteInternshipByID(id);
}
export async function getInternshipTypes() {
  return await DBclient.select().from("internshipFields");
}
