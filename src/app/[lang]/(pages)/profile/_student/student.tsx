"use server";
import { GanttProp } from "@/app/components/Gantt";
import DBClient from "@/knex/config/DBClient";
import StudentGantt from "./StudentGantt";
/**
 * The DataItem interface represents the shape of the data items.
 */
interface DataItem {
  id: number;
  row_id: number;
  name: string;
  startDate: Date;
  endDate: Date;
}

/**
 * Fetched the student Gant information
 * @param date reference date
 * @param studentID the id of the student
 * @param days the amount of days to fetch from the start of that week
 * @returns A promise of a list with {@link GanttProp}
 */
export async function getStudentAgreementGanttIntervals(
  date: Date,
  studentID: string,
  days: number = 6,
): Promise<GanttProp[]> {
  date.setDate(date.getDate() - date.getDay());
  const startDate = new Date(date);
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);
  startDate.setMilliseconds(0);
  date.setDate(date.getDate() + (days > 0 ? days : 6));
  const endDate = new Date(date);
  startDate.setHours(23);
  startDate.setMinutes(59);
  startDate.setSeconds(59);
  startDate.setMilliseconds(999);
  return await DBClient.transaction(async (trx) => {
    const agreements = await trx
      .from("internshipAgreements")
      .select(
        "internships.name",
        "internshipAgreements.id",
        "timeIntervals.startDate",
        "timeIntervals.endDate",
      )
      .where("studentID", studentID)
      .innerJoin(
        "internships",
        "internships.id",
        "internshipAgreements.internshipID",
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
        (data) => data.name === agreement.name,
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
 * The StudentPage component displays a Gantt chart.
 * @param root The root object.
 * @param root.user The user object.
 * @returns The StudentPage component.
 */
export default async function StudentPage({ user }) {
  return <StudentGantt userID={user.id} />;
}
