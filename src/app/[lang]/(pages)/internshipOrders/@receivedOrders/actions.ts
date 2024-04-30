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
  console.log(
    "-------------------------------- request --------------------------------- " +
      JSON.stringify(request)
  );
  // Ensure section_id and yearOfStudy are processed as arrays of numbers
  request.section_id = [Number(request.section_id)];
  request.yearOfStudy = [Number(request.yearOfStudy)];
  const data = await getInternshipPositionObjectByPageRequest(request);

  // Log the fetched data for debugging
  console.log(JSON.stringify(data.elements, null, 2));

  // Handle each element to compute free spots
  const elementsPromises = data.elements.map(async (element) => {
    console.log("element: " + JSON.stringify(element));
    // Fetch agreements related to the current element's ID
    const internshipAgreementPageRequest: InternshipAgreementPageRequest = {
      hasInternshipID: element.id,
    };

    const response = await getInternshipAgreementsByPageRequest(
      internshipAgreementPageRequest
    );

    const agreementAmount = response.totalElements;
    console.log("agreements: " + JSON.stringify(agreementAmount));

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
  amount
) {
  console.log("in actions: subFieldGroupID: " + subFieldGroupID);
  console.log("amount: " + amount);
  // First, get the subFieldGroup
  const subFieldGroup = await DBclient("subFieldGroups")
    .where("id", subFieldGroupID)
    .first();

  // Then, get the parent fieldGroup
  const fieldGroup = await DBclient("fieldGroups")
    .where("id", subFieldGroup.fieldGroupID)
    .first();

  // Finally, get the parent order
  const order = await DBclient("internshipOrders")
    .where("id", fieldGroup.id)
    .first();

  if (subFieldGroup.numStudents >= amount) {
    subFieldGroup.numStudents -= amount;
    await DBclient("subFieldGroups")
      .where("id", subFieldGroupID)
      .update(subFieldGroup);
    const agreements = Array(amount).fill({
      status: "pending",
      startDate: subFieldGroup.startWeek,
      endDate: subFieldGroup.endWeek,
      studyProgram_id: order.studyProgramID,
      internship_id: InternshipID,
      comment: order.comment,
    });

    agreements.forEach((agreement) => saveInternshipAgreementObject(agreement));
  }

  if (subFieldGroup.numStudents == amount) {
    //removes subFieldGroup
    await DBclient("subFieldGroups").where("id", subFieldGroup).del();
  }
}
