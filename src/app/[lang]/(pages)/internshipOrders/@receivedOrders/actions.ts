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
import { PageResponse } from "@/app/_models/pageinition";
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
 * @param status The status of the orders to fetch.
 * @returns A list of ****ALL**** the orders.
 */
export async function fetchOrders(status: string): Promise<Order[]> {
  const orders = await DBclient.table("internshipOrders")
    .innerJoin(
      "fieldGroups",
      "internshipOrders.id",
      "fieldGroups.internshipOrderID",
    )
    .where("internshipOrders.status", status)
    .innerJoin(
      "subFieldGroups",
      "fieldGroups.id",
      "subFieldGroups.fieldGroupID",
    )
    .select("*");
  const studyPrograms = await DBclient.table("studyPrograms")
    .whereIn(
      "studyPrograms.id",
      orders.map((order) => order.studyProgramID),
    )
    .select();
  const educationInstitutes = await DBclient.table("educationInstitutions")
    .select()
    .whereIn(
      "id",
      studyPrograms.map((studyProgram) => studyProgram.educationInstitution_id),
    );

  const response = orders.map((order) => {
    const studyProgram = studyPrograms.find(
      (studyProgram) => studyProgram.id === order.studyProgramID,
    );
    return {
      ...order,
      studyProgram: {
        ...studyProgram,
        educationInstitute: {
          ...educationInstitutes.find(
            (institute) =>
              institute.id === studyProgram.educationInstitution_id,
          ),
        },
      },
    };
  });
  return response;
}

/**
 * Fetches the orders from the databases and creates a list of {@link Order}s.
 * @param request The request to fetch the orders.
 * @returns A list of the orders.
 */
export async function paginateInternships(
  request: InternshipPaginationRequest,
): Promise<PageResponse<Internship>> {
  request.section_id = [Number(request.section_id)];
  request.yearOfStudy = [Number(request.yearOfStudy)];
  return await getInternshipPositionObjectByPageRequest(request);
}

/**
 * Deletes an internship by its id.
 * @param id The id of the internship to delete.
 * @returns A promise that resolves when the internship is deleted.
 */
export async function deleteInternship(id: number) {
  return await deleteInternshipByID(id);
}
/**
 * Fetches the internship types from the database.
 * @returns A list of internship types.
 */
export async function getInternshipTypes() {
  return await DBclient.select().from("internshipFields");
}
/**
 * Fetches the education institutes from the database.
 * @param subFieldGroupID The id of the subFieldGroup.
 * @param InternshipID The id of the internship.
 * @param amount The amount of students to distribute.
 * @param status The status of the distribution.
 * @returns A promise that resolves when the distribution is saved.
 */
export async function saveOrderDistribution(
  subFieldGroupID: number,
  InternshipID: number,
  amount: number,
  status: "Finalized" | "Pending",
) {
  return DBclient.transaction(async (trx) => {
    const subFieldGroup = await trx("subFieldGroups")
      .join("fieldGroups", "subFieldGroups.fieldGroupID", "fieldGroups.id")
      .join(
        "internshipOrders",
        "fieldGroups.internshipOrderID",
        "internshipOrders.id",
      )
      .select(
        "subFieldGroups.id",
        "subFieldGroups.numStudents",
        "subFieldGroups.numStudentsAccepted",
        "subFieldGroups.startWeek",
        "subFieldGroups.endWeek",
        "internshipOrders.studyProgramID",
        "internshipOrders.comment",
      )
      .where("subFieldGroups.id", subFieldGroupID)
      .first();

    if (!subFieldGroup) throw new Error("SubFieldGroup not found.");
    if (amount <= 0) throw new Error("Amount must be greater than 0.");
    if (
      subFieldGroup.numStudents - subFieldGroup.numStudentsAccepted <
      amount
    ) {
      throw new Error(
        "Not enough students in the subFieldGroup to distribute.",
      );
    }

    const coordinatorID = await trx
      .select("internshipOrders.coordinator_id")
      .from("internshipOrders")
      .innerJoin(
        "fieldGroups",
        "internshipOrders.id",
        "fieldGroups.internshipOrderID",
      )
      .innerJoin(
        "subFieldGroups",
        "fieldGroups.id",
        "subFieldGroups.fieldGroupID",
      )
      .where("subFieldGroups.id", subFieldGroup.id)
      .first();

    const numStudentsAccepted = subFieldGroup.numStudentsAccepted + amount;

    await trx("subFieldGroups")
      .where("id", subFieldGroupID)
      .update({ numStudentsAccepted: numStudentsAccepted });

    if (!status) throw new Error("Status is not defined.");

    await trx("internshipOrders")
      .innerJoin(
        "fieldGroups",
        "internshipOrders.id",
        "fieldGroups.internshipOrderID",
      )
      .innerJoin(
        "subFieldGroups",
        "fieldGroups.id",
        "subFieldGroups.fieldGroupID",
      )
      .where("subFieldGroups.id", subFieldGroupID)
      .update({ status: status });

    const agreements = Array.from({ length: amount }, () => ({
      startDate: subFieldGroup.startWeek,
      endDate: subFieldGroup.endWeek,
      studyProgramID: subFieldGroup.studyProgramID,
      internship_id: InternshipID,
      comment: subFieldGroup.comment,
      coordinator_id: coordinatorID.coordinator_id,
    }));

    const ids = await trx("internshipAgreements").insert(agreements);

    const weeklyPracticeDays = 2;

    for (const id of ids) {
      const agreement = await trx("internshipAgreements")
        .where("id", id)
        .first();
      const startDate: Date = agreement.startDate;
      const endDate: Date = agreement.endDate;
      const timeIntervals = await trx
        .from("internshipAgreements")
        .select("timeIntervals.*")
        //Overlaps with the new internship
        .where((builder) => {
          builder
            .where(
              "internshipAgreements.startDate",
              "<",
              subFieldGroup.startWeek,
            )
            .andWhere(
              "internshipAgreements.endDate",
              ">",
              subFieldGroup.startWeek,
            )
            .orWhere(
              "internshipAgreements.startDate",
              "<",
              subFieldGroup.endWeek,
            )
            .andWhere(
              "internshipAgreements.endDate",
              ">",
              subFieldGroup.endWeek,
            );
        })
        .innerJoin(
          "internships",
          "internshipAgreements.internship_id",
          "internships.id",
        )
        //All internships in the same section
        .whereIn("section_id", (builder) => {
          builder
            .select("section_id")
            .from("internships")
            .innerJoin(
              "internshipAgreements",
              "internships.id",
              "internshipAgreements.internship_id",
            )
            .where("internshipAgreements.id", agreement.id);
        })
        //All time intervals within those
        .innerJoin(
          "timeIntervals",
          "internshipAgreements.id",
          "timeIntervals.internshipAgreement_id",
        );
      // 8 - 16 work hours
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);

      while (startDate.getTime() < endDate.getTime()) {
        const daysInTheWeek = [];
        //Loop while it's not sunday and it's not the end of the internship
        while (
          startDate.getDay() !== 6 &&
          startDate.getTime() < endDate.getTime()
        ) {
          daysInTheWeek.push(new Date(startDate));
          //Increment the day
          startDate.setDate(startDate.getDate() + 1);
        }
        //Increment the day
        startDate.setDate(startDate.getDate() + 1);
        daysInTheWeek.push(new Date(startDate));

        //Sort the days by busyness
        let days: Date[] = daysInTheWeek
          .toSorted((a, b) => differenceInBusyness(a, b, timeIntervals))
          .splice(0, weeklyPracticeDays);

        for (const day of days) {
          day.setHours(8);
          day.setMinutes(0);
          day.setSeconds(0);
          const endIntervalDate = new Date(day);
          endIntervalDate.setHours(16);
          await trx("timeIntervals").insert({
            startDate: day,
            endDate: endIntervalDate,
            internshipAgreement_id: id,
          });
        }
      }
    }
  });
}

/**
 * Save the status of the distribution.Either Pending or Finalized
 * @param orderID The ID of the order to save the status of.
 * @param status The status to save.
 * @returns A promise that resolves when the status is saved.
 */
export async function saveOrderStatus(
  orderID: number,
  status: "Finalized" | "Pending",
) {
  console.log(
    "status in actions: " + status + " orderID in actions: " + orderID,
  );
  return await DBclient("internshipOrders")
    .where("id", orderID)
    .update({ status: status });
}

/**
 * A function that calculates the different between two dates within a section of internship agreements
 * @param a Date a
 * @param b Date b
 * @param timeIntervals Time intervals that are already created
 * @returns The difference in busyness
 */
function differenceInBusyness(a: any, b: any, timeIntervals: any[]) {
  return (
    timeIntervals.filter((ti) => {
      return (
        (ti.startDate >= a && ti.startDate <= a) ||
        (ti.endDate >= a && ti.endDate <= a)
      );
    }).length -
    timeIntervals.filter((ti) => {
      return (
        (ti.startDate >= b && ti.startDate <= b) ||
        (ti.endDate >= b && ti.endDate <= b)
      );
    }).length
  );
}
