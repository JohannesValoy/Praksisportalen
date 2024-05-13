"use server";
import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth";
import { Section } from "@/app/_models/Section";
import { getSectionObjectByID } from "@/services/SectionService";
import SectionPage from "./section";
import { fetchEmployees, fetchSectionTypes } from "../add/action";
import { GanttProp } from "@/app/_components/Gantt";
import DBClient from "@/knex/config/DBClient";

/**
 * Fetched the student Gant information
 * @param date reference date
 * @param studentID the id of the student
 * @param days the amount of days to fetch from the start of that week
 * @returns A promise of a list with {@link GanttProp}
 */
export async function getSectionGanttIntervals(
  date: Date,
  sectionID: string,
  days: number = 6,
): Promise<GanttProp[]> {
  const [startDate, endDate] = getIntervalBetweenStartOfWeekAndTotalOffsetDays(date, days)
  return await DBClient.transaction(async (trx) => {
    const agreements = await trx
      .from("sections")
      .select(
        "internships.name",
        "internships.id",
        "timeIntervals.startDate",
        "timeIntervals.endDate",
      )
      .where("sections.id", sectionID)
      .innerJoin("internships", "internships.sectionID", "sections.id")
      .innerJoin(
        "internshipAgreements",
        "internshipAgreements.internshipID",
        "internships.id",
      )
      .innerJoin(
        "timeIntervals",
        "timeIntervals.internshipAgreementID",
        "internshipAgreements.id",
      )
      .where("timeIntervals.startDate", ">=", startDate)
      .andWhere("timeIntervals.startDate", "<=", endDate);
    const datalist: GanttProp[] = [];
    agreements.forEach((agreement) => {
      let agreementObject: GanttProp = datalist.find(
        (data) => data.id === agreement.id,
      );
      if (!agreementObject) {
        agreementObject = {
          id: agreement.id,
          name: agreement.name,
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

/**
 * The Page component fetches a section object by ID and renders the SectionPage component.
 * @param root The root object.
 * @param root.params The parameters of the page.
 * @returns The SectionPage component.
 */
export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  let section: Section = null;

  /**
   * Fetches the section object by ID.
   * If the section object is not found, the notFound function is called.
   * This function will render the 404 page.
   */
  try {
    section = await getSectionObjectByID(Number(params.id));
  } catch (error) {
    console.error("Failed to fetch Section", error);
    notFound();
  }

  return (
    <SectionPage
      section={section}
      wordbook={null}
      user={await getUser()}
      sectionTypes={await fetchSectionTypes()}
      employees={await fetchEmployees()}
    />
  );
}
