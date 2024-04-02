/** @format */

import React from "react";

interface GanttProps {
  datalist: Array<[string, Date, Date]>;
}

interface MonthMarker {
  label: string;
  offsetPercent: number;
}

interface DateRange {
  [key: string]: Array<[Date, Date]>;
}

const Gantt: React.FC<GanttProps> = ({ datalist }) => {
  const startDates = datalist.map((item) => item[1].getTime());
  const endDates = datalist.map((item) => item[2].getTime());
  const minStartDate = Math.min(...startDates);
  const maxEndDate = Math.max(...endDates);
  const totalTime = maxEndDate - minStartDate;

  const monthMarkers: MonthMarker[] = [];
  let currentMonth = new Date(minStartDate);
  if (currentMonth.getDate() > 0) {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
  }
  currentMonth.setDate(1); // Set to the first day of the month

  while (currentMonth.getTime() < maxEndDate) {
    const monthStart = currentMonth.getTime();
    const offsetPercent = ((monthStart - minStartDate) / totalTime) * 100;

    monthMarkers.push({
      label: currentMonth.toLocaleString("default", { month: "short" }),
      offsetPercent,
    });
    currentMonth.setMonth(currentMonth.getMonth() + 1);
  }

  const groupedData: DateRange = datalist.reduce((acc: DateRange, curr) => {
    const [section, startDate, endDate] = curr;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push([startDate, endDate]);
    return acc;
  }, {});

  return (
    <div
      className="bg-base-200  p-5 rounded-lg flex flex-col items-center justify-center"
      style={{
        height: "70%",
        width: "70%",
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

          <div className="rounded-lg flex-1 flex flex-col relative h-full">
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
                    >
                      <div
                        className="bg-accent"
                        style={{
                          borderRadius: "5px",
                          height: "50%",
                          width: "100%",
                        }}
                      ></div>
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
    </div>
  );
};

export default Gantt;
