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

interface MonthMarker {
  label: string;
  offsetPercent: number;
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
    console.log("hello There");
    fetchData(currentDate.current).then(setDatalist);
  }

  const startDates = datalist
    .map((item) =>
      item.intervals.map((interval) => interval.startDate.getTime())
    )
    .flat();
  const endDates = datalist
    .map((item) => item.intervals.map((interval) => interval.endDate.getTime()))
    .flat();
  const minStartDate = Math.min(...startDates);
  const maxEndDate = Math.max(...endDates);
  const totalTime = maxEndDate - minStartDate;

  const monthMarkers: MonthMarker[] = [];
  let currentMonth = new Date(minStartDate);
  if (currentMonth.getDate() > 0) {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
  }
  currentMonth.setDate(1); // Set to the first day of the month

  while (currentMonth.getTime() <= maxEndDate) {
    const monthStart = currentMonth.getTime();
    const offsetPercent = ((monthStart - minStartDate) / totalTime) * 100;

    monthMarkers.push({
      label: currentMonth.toLocaleString("default", { month: "short" }),
      offsetPercent,
    });
    currentMonth.setMonth(currentMonth.getMonth() + 1);
  }

  return (
    <div
      className="bg-secondary-200 w-full  p-5 rounded-lg flex flex-col items-center justify-center"
      style={{
        overflowX: "auto",
        height: "40rem",
        width: "100%",
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
            className="flex flex-col"
            style={{
              width: "fit-content",
              paddingLeft: "2%",
              paddingRight: "2%",
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

          <div className="rounded-lg flex-1 flex flex-col relative h-full">
            {datalist.map((dateRanges, index) => (
              <div
                key={index}
                className="flex flex-row"
                style={{ height: "100%", position: "relative" }}
              >
                {dateRanges.intervals.map((dateRange, index) => {
                  const { startDate, endDate } = dateRange;
                  const duration = endDate.getTime() - startDate.getTime();
                  const offset = startDate.getTime() - minStartDate;
                  const widthPercent = (duration / totalTime) * 100;
                  const marginLeftPercent = (offset / totalTime) * 100;
                  return (
                    <div
                      key={index}
                      style={{
                        width: `${widthPercent}%`,
                        marginLeft: `${marginLeftPercent}%`,
                        height: "100%",
                        position: "absolute",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 99,
                      }}
                      className="bg-primary"
                    >
                      <span
                        className="w-full h-full bg-primary rounded-full"
                        title={`start: ${startDate.toLocaleDateString()}\nend: ${endDate.toLocaleDateString()}`}
                      ></span>
                    </div>
                  );
                })}
              </div>
            ))}
            {monthMarkers.map((marker, index) => (
              <div
                key={index}
                className="absolute bg-primary"
                style={{
                  height: "100%",
                  width: "3px",
                  borderRadius: "10px",
                  transform: "translateX(-100%)",
                  left: `${marker.offsetPercent}%`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    transform: "translateY(105%) translateX(-50%)",
                  }}
                >
                  {marker.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex join">
        <button
          className="btn h-full join-item text-base-content bg-secondary"
          onClick={weekForward}
        >
          <ChevronLeftIcon className="size-6 " />
        </button>
        <div className="btn flex h-full items-center join-item p-2 bg-secondary">
          10
        </div>
        <button
          className="btn h-full  join-item text-base-content bg-secondary"
          onClick={weekBack}
        >
          <ChevronRightIcon className="size-6  " />
        </button>
      </div>
    </div>
  );
}
