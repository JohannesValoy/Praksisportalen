"use client";

import Gantt, { GanttProp } from "../Gantt";
import { getStudentAgreementGanttIntervals } from "@/app/[lang]/(pages)/profile/_student/student";

/**
 * A Gantt diagram that show for a user
 * @param root the root element
 * @param root.userID the id of the student
 * @returns a JSX element that shows the student GanttDiagram
 */
export default function StudentGantt({ userID }) {
  /**
   * A function to fetch the data from the server
   * @param date the reference date to fetch from
   * @returns list of GanttProps
   */
  async function getData(date: Date) {
    return await getStudentAgreementGanttIntervals(date, userID);
  }

  return <Gantt fetchData={getData} />;
}
