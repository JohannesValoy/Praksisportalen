"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
/**
 * The GanttProps interface represents the props of the Gantt component.
 */
export interface GanttProp {
  id: number;
  name: string;
  intervals: { startDate: Date; endDate: Date }[];
  onClickUrl?: string;
}

/**
 * The Gantt component displays a Gantt chart.
 * @param root The root object.
 * @param root.fetchData A function that takes in a Date and returns a list of GanttProps.
 * @returns A Gantt chart.
 */
export default function Gantt({
  fetchData,
}: Readonly<{
  fetchData: (data) => Promise<GanttProp[]>;
}>) {
  const [datalist, setDatalist] = useState([]);
  const currentDate = useRef(new Date());
  const minStartDate = new Date(currentDate.current);
  minStartDate.setHours(0, 0, 0, 0);
  minStartDate.setDate(minStartDate.getDate() - minStartDate.getDay());
  const maxEndDate = new Date(minStartDate);
  maxEndDate.setDate(maxEndDate.getDate() + 6);
  const totalTime = 604800000;

  useEffect(() => {
    fetchData(currentDate.current).then((data) => setDatalist(data));
  }, [fetchData]);

  /**
   * Function to fetch for a week forward
   * It also changes the currentDate to a week forward
   */
  function weekForward() {
    currentDate.current.setDate(currentDate.current.getDate() + 7);
    fetchData(currentDate.current).then(setDatalist);
  }

  /**
   * Function to fetch for a week backwards'
   * It also changes the currentDate to a week backwards
   */
  function weekBack() {
    currentDate.current.setDate(currentDate.current.getDate() - 7);
    fetchData(currentDate.current).then(setDatalist);
  }

  let weekNumber = getISOWeekNumber(currentDate.current);

  /**
   * Gets the current week number from first start day of the array. Made mainly by Windows Copilot
   * @param date The date to get the week number of.
   * @returns The week number
   */
  function getISOWeekNumber(date: Date): number {
    // Copy date so don't modify original
    const tempDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );

    // Set to nearest Thursday (unix start day): current date + 4 - current day number
    // Make Sunday's day number 7
    tempDate.setUTCDate(
      tempDate.getUTCDate() + 4 - (tempDate.getUTCDay() || 7)
    );

    // Get first day of year
    const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));

    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil(
      ((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
    );

    // Return the week number
    return weekNo;
  }

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div
      className="bg-secondary-200 w-full  p-5 rounded-lg flex flex-col items-center justify-center"
      style={{
        overflowX: "auto",
        height: "80vh",
        width: "95%",
        border: "1px solid rgba(100,100,100,0.2)",
      }}
    >
      <h1>Timeline</h1>
      <div className="flex flex-col w-full h-full">
        <div
          className="flex flex-row gap-2"
          style={{ height: "90%", width: "95%" }}
        >
          <div
            className="flex flex-col p-2"
            style={{
              width: "10rem",
            }}
          >
            {datalist.map((data, index) => (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={index}
              >
                {data.name}
              </div>
            ))}
          </div>

          <div className="flex-1 flex flex-col h-full">
            <div className="h-full bg-base-200 rounded-lg py-3 my-3">
              {datalist.map((dateRanges, index) => (
                <div
                  key={index}
                  className="flex flex-row relative"
                  style={{ height: `${100 / datalist.length}%` }}
                >
                  {dateRanges.intervals.map((dateRange, index) => {
                    const { startDate, endDate } = dateRange;
                    const offset = startDate.getTime() - minStartDate.getTime();
                    const duration = endDate.getTime() - startDate.getTime();
                    const widthPercent = (duration / totalTime) * 100;
                    const marginLeftPercent = (offset / totalTime) * 100;
                    return (
                      <div
                        key={index}
                        style={{
                          margin: 0,
                          position: "absolute",
                          width: `${widthPercent}%`,
                          marginLeft: `${marginLeftPercent}%`,
                          height: "95%",
                          display: "flex",
                          justifyContent: "center",
                          padding: 0,
                          alignItems: "center",
                          zIndex: 99,
                        }}
                        //Shows up when hovering over it
                        title={`start: ${startDate.toLocaleString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}\nend: ${endDate.toLocaleString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}`}
                        className="bg-primary rounded-lg"
                      ></div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="flex flex-row w-full h-fit">
              {daysOfWeek.map((day) => (
                <p key={day} className="w-full flex justify-center">
                  {day}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex join">
        <button
          className="btn h-full join-item text-secondary-content bg-secondary"
          onClick={weekBack}
        >
          <ChevronLeftIcon className="size-6 " />
        </button>
        <div className="btn flex h-full items-center join-item p-2 text-secondary-content bg-secondary">
          {weekNumber}
        </div>
        <button
          className="btn h-full  join-item text-secondary-content bg-secondary"
          onClick={weekForward}
        >
          <ChevronRightIcon className="size-6  " />
        </button>
      </div>
    </div>
  );
}
