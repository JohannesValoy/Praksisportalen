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
import {
  getInternshipAgreementObjectByID,
  getInternshipAgreementObjectByIDList,
  getInternshipAgreementsByPageRequest,
  saveInternshipAgreementObject,
} from "@/services/AgreementService";
import {
  InternshipAgreement,
  InternshipAgreementPageRequest,
} from "../../../../_models/Agreement";
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
/**
 * Fetches ****ALL**** the orders from the databases and creates a list of {@link Order}s.
 * @returns A list of ****ALL**** the orders.
 */
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
  request.section_id = [Number(request.section_id)];
  request.yearOfStudy = [Number(request.yearOfStudy)];
  const data = await getInternshipPositionObjectByPageRequest(request);

  // Handle each element to compute free spots
  const elementsPromises = data.elements.map(async (element) => {
    // Fetch agreements related to the current element's ID
    const internshipAgreementPageRequest: InternshipAgreementPageRequest = {
      hasInternshipID: element.id,
    };

    const response = await getInternshipAgreementsByPageRequest(
      internshipAgreementPageRequest
    );

    const agreementAmount = response.totalElements;

    // Calculate free spots by subtracting the number of agreements from current capacity
    const freeSpots = element.currentCapacity - agreementAmount;

    return {
      name: element.name,
      field: element.internship_field,
      yearOfStudy: element.yearOfStudy,
      freeSpots,
      id: element.id,
    };
  });

  // Wait for all promises to resolve
  const elements = await Promise.all(elementsPromises);

  // Return the updated data including the modified elements array with the free spots computed
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
export async function saveOrderDistribution(
  subFieldGroupID: number,
  InternshipID: number,
  amount: number
) {
  return DBclient.transaction(async (trx) => {
    const subFieldGroup = await trx("subFieldGroups")
      .join("fieldGroups", "subFieldGroups.fieldGroupID", "fieldGroups.id")
      .join(
        "internshipOrders",
        "fieldGroups.internshipOrderID",
        "internshipOrders.id"
      )
      .select(
        "subFieldGroups.numStudents",
        "subFieldGroups.startWeek",
        "subFieldGroups.endWeek",
        "internshipOrders.studyProgramID",
        "internshipOrders.comment"
      )
      .where("subFieldGroups.id", subFieldGroupID)
      .first();

    if (!subFieldGroup) throw new Error("SubFieldGroup not found.");
    if (amount <= 0) throw new Error("Amount must be greater than 0.");
    if (subFieldGroup.numStudents < amount) {
      throw new Error(
        "Not enough students in the subFieldGroup to distribute."
      );
    }

    const newNumStudents = subFieldGroup.numStudents - amount;
    await trx("subFieldGroups")
      .where("id", subFieldGroupID)
      .update({ numStudents: newNumStudents });

    const agreements = Array.from({ length: amount }, () => ({
      status: "pending",
      startDate: subFieldGroup.startWeek,
      endDate: subFieldGroup.endWeek,
      studyProgram_id: subFieldGroup.studyProgramID,
      internship_id: InternshipID,
      comment: subFieldGroup.comment,
    }));

    await trx("internshipAgreements").insert(agreements);

    if (newNumStudents === 0) {
      await trx("subFieldGroups").where("id", subFieldGroupID).del();
    }
  });
}
