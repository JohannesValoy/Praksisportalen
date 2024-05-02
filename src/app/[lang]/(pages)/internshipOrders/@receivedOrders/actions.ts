/** @format */

"use server";

import {
  Internship,
  InternshipPaginationRequest,
} from "@/app/_models/InternshipPosition";
import {
  deleteInternshipByID,
  getInternshipPositionObjectByPageRequest,
} from "@/services/InternshipPositionService";
import DBclient from "@/knex/config/DBClient";
import "server-only";
import { getInternshipAgreementsByPageRequest } from "@/services/AgreementService";
import { InternshipAgreementPageRequest } from "../../../../_models/Agreement";
import { PageRequest, PageResponse } from "@/app/_models/pageinition";
export interface Order {
  id: number;
  studyProgramID: number;
  internshipField: string;
  studyYear: number;
  comment: string;
  numStudents: number;
  numStudentsAccepted: number;
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
      studyPrograms.map((studyProgram) => studyProgram.educationInstitution_id)
    );

  const response = orders.map((order) => {
    const studyProgram = studyPrograms.find(
      (studyProgram) => studyProgram.id === order.studyProgramID
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
): Promise<PageResponse<Internship>> {
  request.section_id = [Number(request.section_id)];
  request.yearOfStudy = [Number(request.yearOfStudy)];
  return await getInternshipPositionObjectByPageRequest(request);
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
  amount: number,
  status: "Finalized" | "Pending"
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
        "subFieldGroups.id",
        "subFieldGroups.numStudents",
        "subFieldGroups.numStudentsAccepted",
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

    const coordinatorID = await trx
      .select("internshipOrders.coordinator_id")
      .from("internshipOrders")
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
      .where("subFieldGroups.id", subFieldGroup.id)
      .first();

    const newNumStudents = subFieldGroup.numStudents - amount;
    const numStudentsAccepted = subFieldGroup.numStudentsAccepted + amount;
    console.log("Amount: " + amount);
    console.log("numStudentsAccepted", numStudentsAccepted);
    console.log(JSON.stringify(subFieldGroup, null, 2));

    await trx("subFieldGroups")
      .where("id", subFieldGroupID)
      .update({ numStudentsAccepted: numStudentsAccepted });

    if (!status) throw new Error("Status is not defined.");

    await trx("internshipOrders")
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
      .where("subFieldGroups.id", subFieldGroupID)
      .update({ status: status });

    const agreements = Array.from({ length: amount }, () => ({
      startDate: subFieldGroup.startWeek,
      endDate: subFieldGroup.endWeek,
      studyProgram_id: subFieldGroup.studyProgramID,
      internship_id: InternshipID,
      comment: subFieldGroup.comment,
      coordinator_id: coordinatorID.coordinator_id,
    }));

    await trx("internshipAgreements").insert(agreements);

    if (newNumStudents === 0) {
      await trx("subFieldGroups").where("id", subFieldGroupID).del();
    }
  });
}
