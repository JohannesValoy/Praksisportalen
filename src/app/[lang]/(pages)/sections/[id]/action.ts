"use server";

import { GanttProp } from "@/app/_components/Gantt";
import DBClient from "@/knex/config/DBClient";
import { getIntervalBetweenStartOfWeekAndTotalOffsetDays } from "@/lib/tools";
import "server-only";

/**
 * The fetchSections function fetches all sections from the database.
 * @param id The user object.
 * @param data The data object.
 * @returns Updated list of sections.
 */
export async function editSectionDetails(id: number, data: any) {
  return await DBClient("sections").where("id", id).update(data);
}

/**
 * Fetched the sections Gantt information
 * @param date reference date
 * @param sectionID the id of the section
 * @param days the amount of days to fetch from the start of that week
 * @returns A promise of a list with {@link GanttProp}
 */
export async function getSectionGanttIntervals(
  date: Date,
  sectionID: string,
  days: number = 6
): Promise<GanttProp[]> {
  const [startDate, endDate] = getIntervalBetweenStartOfWeekAndTotalOffsetDays(
    date,
    days
  );
  return await DBClient.transaction(async (trx) => {
    const agreements = await trx
      .from("sections")
      .select(
        "internships.name",
        "internships.yearOfStudy",
        "internships.id",
        "timeIntervals.startDate",
        "timeIntervals.endDate"
      )
      .where("sections.id", sectionID)
      .innerJoin("internships", "internships.sectionID", "sections.id")
      .innerJoin(
        "internshipAgreements",
        "internshipAgreements.internshipID",
        "internships.id"
      )
      .innerJoin(
        "timeIntervals",
        "timeIntervals.internshipAgreementID",
        "internshipAgreements.id"
      )
      .where("timeIntervals.startDate", ">=", startDate)
      .andWhere("timeIntervals.startDate", "<=", endDate);
    const datalist: GanttProp[] = [];
    agreements.forEach((agreement) => {
      let agreementObject: GanttProp = datalist.find(
        (data) => data.id === agreement.id
      );
      if (!agreementObject) {
        agreementObject = {
          id: agreement.id,
          name: agreement.name + " Year " + agreement.yearOfStudy,
          intervals: [],
        };
        datalist.push(agreementObject);
      }
      agreementObject.intervals.push({
        startDate: agreement.startDate,
        endDate: agreement.endDate,
      });
    });
    return datalist;
  });
}
