import Gantt, { GanttProp } from "@/app/components/Gantt";
import DBClient from "@/knex/config/DBClient";
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
 *
 * @param date
 * @param studentID
 */
async function getStudentAgreementGanttIntervals(
  date: Date,
  studentID: string
): Promise<GanttProp[]> {
  date.setDate(date.getDate() - date.getDay());
  const startDate = new Date(date);
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);
  startDate.setMilliseconds(0);
  date.setDate(date.getDate() + 6);
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
        "timeIntervals.endDate"
      )
      .where("studentID", studentID)
      .innerJoin(
        "internships",
        "internships.id",
        "internshipAgreements.internshipID"
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
        (data) => data.name === agreement.name
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
  const datalist = await getStudentAgreementGanttIntervals(new Date(), user.id);
  return <Gantt datalist={datalist} />;
}
