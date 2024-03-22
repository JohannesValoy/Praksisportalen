/** @format */

import React from "react";

// Your updated data list
const datalist = [
  ["Section 1", new Date(2024, 3, 9), new Date(2024, 3, 25)],
  ["Section 2", new Date(2024, 0, 25), new Date(2024, 2, 20)],
  ["Section 2", new Date(2024, 4, 28), new Date(2024, 5, 25)],
  ["Section 3", new Date(2024, 2, 23), new Date(2024, 3, 5)],
  ["Section 3", new Date(2024, 3, 27), new Date(2024, 4, 8)],
  ["Section 6", new Date(2024, 4, 9), new Date(2024, 4, 28)],
  ["Section 6", new Date(2024, 9, 28), new Date(2024, 10, 1)],
  ["Section 6", new Date(2024, 7, 28), new Date(2024, 8, 18)],
  ["Section 9", new Date(2024, 6, 28), new Date(2024, 7, 15)],
  ["Section 9", new Date(2024, 5, 28), new Date(2024, 6, 20)],
  ["Section 9", new Date(2024, 8, 28), new Date(2024, 9, 12)],
];

const Gantt = () => {
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
        year: "numeric",
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
    <div className="bg-gray-800 p-5 rounded-lg flex flex-col items-center justify-center w-full h-full">
      <h1>Timeline</h1>
      <div className="flex flex-col w-full h-full">
        <div
          className="flex flex-row gap-2"
          style={{ height: "90%", width: "95%" }}
        >
          <div className="flex flex-col" style={{ width: "10rem" }}>
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
                  transform: "translateX(-50%)",
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
