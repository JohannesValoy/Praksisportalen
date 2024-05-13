"use client";

import Gantt from "../../../../_components/Gantt";
import { getSectionGanttIntervals } from "./page";

/**
 * A Gantt diagram that show for a user
 * @param root the root element
 * @param root.userID the id of the student
 * @returns a JSX element that shows the student GanttDiagram
 */
export default function SectionGantt({ sectionID }) {
  /**
   * A function to fetch the data from the server
   * @param date the reference date to fetch from
   * @returns list of GanttProps
   */
  async function getData(date: Date) {
    return await getSectionGanttIntervals(date, sectionID);
  }

return <Gantt fetchData={getData}/>
}