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
 * The StudentPage component displays a Gantt chart.
 * @param root The root object.
 * @param root.user The user object.
 * @returns The StudentPage component.
 */
export default async function StudentPage({ user }) {
  const datalist = await DBClient.transaction(async (trx) => {
    const agreements = await trx
      .from("internshipAgreements")
      .select(
        "internships.name",
        "internshipAgreements.id",
        "timeIntervals.startDate",
        "timeIntervals.endDate"
      )
      .where("studentID", user.id)
      .innerJoin(
        "internships",
        "internships.id",
        "internshipAgreements.internshipID"
      )
      .innerJoin(
        "timeIntervals",
        "timeIntervals.internshipAgreementID",
        "internshipAgreements.id"
      );
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
  return <Gantt datalist={datalist} />;
}
