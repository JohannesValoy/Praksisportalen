"use client";

import Gantt from "../../../../_components/Gantt";
import { getSectionGanttIntervals } from "./action";

/**
 * A Gantt diagram that shows time intervals within a section
 * @param root the root element
 * @param root.sectionID the id of the section
 * @returns a JSX element that shows the sections timeintervals GanttDiagram
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

  return <Gantt fetchData={getData} />;
}
