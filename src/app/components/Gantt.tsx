/** @format */
"use server";

import React from "react";

// Your updated data list

const Gantt = ({ datalist }) => {
  const startDates = datalist.map((item) => item[1].getTime());
  const endDates = datalist.map((item) => item[2].getTime());
  const minStartDate = Math.min(...startDates);
  const maxEndDate = Math.max(...endDates);
  const totalTime = maxEndDate - minStartDate;

  // Calculate month markers
  const monthMarkers = [];
  let currentMonth = new Date(minStartDate);
  if (currentMonth.getDate() > 0) {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
  }
  currentMonth.setDate(1); // Set to the first day of the month

  while (currentMonth.getTime() < maxEndDate + 1) {
    const monthStart = currentMonth.getTime();
    const offsetPercent = ((monthStart - minStartDate) / totalTime) * 100;

    monthMarkers.push({
      label: currentMonth.toLocaleString("default", {
        month: "short",
      }),
      offsetPercent,
    });
    currentMonth.setMonth(currentMonth.getMonth() + 1);
  }

  // Group data by section
  const groupedData = datalist.reduce((acc, curr) => {
    const [section, startDate, endDate] = curr;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push([startDate, endDate]);
    return acc;
  }, {});

  return (
    <div
      className="bg-gray-800 p-5 rounded-lg flex flex-col items-center justify-center"
      style={{ height: "70%", width: "70%" }}
    >
      <h1>Timeline</h1>
      <div className="flex flex-col w-full h-full">
        <div
          className="flex flex-row gap-2"
          style={{ height: "90%", width: "95%" }}
        >
          <div
            className="flex flex-col"
            style={{ width: "fit-content", padding: "2%" }}
          >
            {Object.keys(groupedData).map((section, index) => (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={index}
              >
                {section}
              </div>
            ))}
          </div>

          <div className="bg-gray-700 rounded-lg flex-1 flex flex-col relative h-full">
            {/* Bars */}
            {Object.values(groupedData).map((dateRanges, index) => (
              <div
                key={index}
                className="flex flex-row"
                style={{ height: "100%", position: "relative" }}
              >
                {dateRanges.map((dateRange, index) => {
                  // TODO - Should properly handle overlapping date ranges
                  //TODO - Add a tooltip to show the date range
                  //TODO - Add a label to show the section name
                  const [startDate, endDate] = dateRange;
                  const duration = endDate.getTime() - startDate.getTime();
                  const offset = startDate.getTime() - minStartDate;
                  const widthPercent = (duration / totalTime) * 100;
                  const marginLeftPercent = (offset / totalTime) * 100;
                  return (
                    <div
                      key={index}
                      className="bg-gray-400 rounded-lg mb-1"
                      style={{
                        width: `${widthPercent}%`,
                        marginLeft: `${marginLeftPercent}%`,
                        height: "100%",
                        position: "absolute",
                        zIndex: 99,
                      }}
                    ></div>
                  );
                })}
              </div>
            ))}
            {/* Month Markers */}
            {monthMarkers.map((marker, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  backgroundColor: "rgba(150, 150, 150, 0.5)",
                  height: "100%",
                  width: "2px",
                  transform: "translateX(-100%)",
                  left: `${marker.offsetPercent}%`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    transform: "translateY(105%)",
                  }}
                >
                  {marker.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gantt;
