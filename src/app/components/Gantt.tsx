/** @format */
/* 
import React from "react";

// Your data list
const datalist = [
  ["Section 1", new Date(2024, 3, 9), new Date(2024, 3, 25)],
  ["Section 2", new Date(2024, 2, 3), new Date(2024, 2, 20)],
  ["Section 3", new Date(2024, 2, 23), new Date(2024, 3, 5)],
  ["Section 4", new Date(2024, 3, 27), new Date(2024, 4, 8)],
  ["Section 5", new Date(2024, 4, 9), new Date(2024, 4, 28)],
  ["Section 6", new Date(2024, 4, 28), new Date(2024, 5, 12)],
  ["Section 6", new Date(2024, 7, 28), new Date(2024, 8, 12)],
];

const Gantt = () => {
  // Calculate the overall start and end dates
  const startDates = datalist.map((item) => item[1].getTime());
  const endDates = datalist.map((item) => item[2].getTime());
  const minStartDate = Math.min(...startDates);
  const maxEndDate = Math.max(...endDates);
  const totalTime = maxEndDate - minStartDate;

  // Define a scaling factor to convert dates to pixels
  const scaleFactor = 100 / totalTime; // Adjust this factor as needed

  // Generate bars for each section
  const bars = datalist.map((item, index) => {
    const [section, startDate, endDate] = item;
    const startPosition = (startDate.getTime() - minStartDate) * scaleFactor;
    const barWidth = (endDate.getTime() - startDate.getTime()) * scaleFactor;

    return (
      <div
        key={index}
        className="bg-gray-400 p-2 rounded-lg"
        style={{ width: `${barWidth}rem`, marginLeft: `${star, height: "100%" }}tPosition}rem` }}
      ></div>
    );
  });

  // Generate section labels
  const sections = [...new Set(datalist.map((item) => item[0]))]
    .sort()
    .map((section, index) => (
      <div key={index} className="flex flex-row gap-2">
        <div>{section}</div>
      </div>
    ));

  return (
    <div className="bg-gray-800 p-5 rounded-lg flex flex-col items-center justify-center">
      <h1>Chart</h1>
      <div className="flex flex-row gap-2">
        <div className="w-20">{sections}</div>
        <div className="bg-gray-700 p-2 rounded-lg" style={{ width: "100%" }}>
          {bars}
        </div>
      </div>
    </div>
  );
};

export default Gantt;
 */
/* 
const Gantt = () => {
  return (
    <div className="bg-gray-800 p-5 rounded-lg flex flex-col items-center justify-center w-full">
      <h1>Chart</h1>
      <div className="flex flex-row gap-2 w-full">
        <div className="w-20">
          <div className="flex flex-row gap-2">
            <div>Section 1</div>
          </div>
          <div className="flex flex-row gap-2">
            <div>Section 2</div>
          </div>
          <div className="flex flex-row gap-2">
            <div>Section 3</div>
          </div>
          <div className="flex flex-row gap-2">
            <div>Section 4</div>
          </div>
          <div className="flex flex-row gap-2">
            <div>Section 5</div>
          </div>
          <div className="flex flex-row gap-2">
            <div>Section 6</div>
          </div>
          <div className="flex flex-row gap-2">
            <div>Section 7</div>
          </div>
          <div className="flex flex-row gap-2">
            <div>Section 8</div>
          </div>
          <div className="flex flex-row gap-2">
            <div>Section 9</div>
          </div>
        </div>

        <div
          className="bg-gray-700 p-2 rounded-lg flex flex-col"
          style={{ width: "100%" }}
        >
          <div
            className="bg-gray-400 p-2 rounded-lg"
            style={{ width: "10%", marginLeft: "15%", height: "100%" }}
          ></div>
          <div
            className="bg-gray-400 p-2 rounded-lg"
            style={{ width: "10%", marginLeft: "45%", height: "100%" }}
          ></div>
          <div
            className="bg-gray-400 p-2 rounded-lg"
            style={{ width: "10%", marginLeft: "35%", height: "100%" }}
          ></div>
          <div
            className="bg-gray-400 p-2 rounded-lg"
            style={{ width: "10%", marginLeft: "5%", height: "100%" }}
          ></div>
          <div
            className="bg-gray-400 p-2 rounded-lg"
            style={{ width: "10%", marginLeft: "25%", height: "100%" }}
          ></div>
          <div
            className="bg-gray-400 p-2 rounded-lg"
            style={{ width: "10%", marginLeft: "55%", height: "100%" }}
          ></div>
          <div
            className="bg-gray-400 p-2 rounded-lg"
            style={{ width: "10%", marginLeft: "65%", height: "100%" }}
          ></div>
          <div
            className="bg-gray-400 p-2 rounded-lg"
            style={{ width: "10%", marginLeft: "75%", height: "100%" }}
          ></div>
          <div
            className="bg-gray-400 p-2 rounded-lg"
            style={{ width: "10%", marginLeft: "85%", height: "100%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Gantt;
 */
/* 
import React from "react";
// Your updated data list
const datalist = [
  ["Section 1", new Date(2024, 3, 9), new Date(2024, 3, 25)],
  ["Section 2", new Date(2024, 4, 28), new Date(2024, 5, 25)],
  ["Section 2", new Date(2024, 2, 3), new Date(2024, 2, 20)],
  ["Section 3", new Date(2024, 2, 23), new Date(2024, 3, 5)],
  ["Section 4", new Date(2024, 3, 27), new Date(2024, 4, 8)],
  ["Section 5", new Date(2024, 4, 9), new Date(2024, 4, 28)],
  ["Section 6", new Date(2024, 9, 28), new Date(2024, 10, 12)],
  ["Section 7", new Date(2024, 7, 28), new Date(2024, 8, 18)],
  ["Section 8", new Date(2024, 6, 28), new Date(2024, 7, 15)],
  ["Section 9", new Date(2024, 5, 28), new Date(2024, 6, 20)],
  ["Section 11", new Date(2024, 8, 28), new Date(2024, 9, 12)],
  // Add or adjust your sections and dates as needed
];

const Gantt = () => {
  // Calculate overall start and end dates
  const startDates = datalist.map((item) => item[1].getTime());
  const endDates = datalist.map((item) => item[2].getTime());
  const minStartDate = Math.min(...startDates);
  const maxEndDate = Math.max(...endDates);
  const totalTime = maxEndDate - minStartDate;

  // Generate bars for each section with percentage-based scaling
  const bars = datalist.map((item, index) => {
    const [section, startDate, endDate] = item;
    const duration = endDate.getTime() - startDate.getTime();
    const offset = startDate.getTime() - minStartDate;

    // Calculate width and marginLeft as percentages
    const widthPercent = (duration / totalTime) * 100;
    const marginLeftPercent = (offset / totalTime) * 100;

    return (
      <div
        key={index}
        className="bg-gray-400 p-2 rounded-lg"
        style={{
          width: `${widthPercent}%`,
          marginLeft: `${marginLeftPercent}%`,
          height: "100%",
        }} // Adjust the height as needed
      ></div>
    );
  });

  return (
    <div className="bg-gray-800 p-5 rounded-lg flex flex-col items-center justify-center w-full h-full">
      <h1>Timeline</h1>
      <div className="flex flex-row gap-2 w-full h-full">
        <div
          className="h-full flex flex-col justify-around"
          style={{ width: "10rem" }}
        >
          {datalist.map((item, index) => (
            <div key={index} className="flex flex-row">
              {item[0]}
            </div>
          ))}
        </div>
        <div
          className="bg-gray-700 p-2 rounded-lg flex flex-col"
          style={{ width: "100%" }}
        >
          {bars}
        </div>
      </div>
    </div>
  );
};
export default Gantt;
 */
/* 
import React from "react";

// Your updated data list
const datalist = [
  ["Section 1", new Date(2024, 3, 20), new Date(2024, 4, 9)],
  ["Section 2", new Date(2024, 4, 28), new Date(2024, 5, 25)],
  ["Section 2", new Date(2024, 2, 3), new Date(2024, 3, 20)],
  ["Section 3", new Date(2024, 9, 28), new Date(2024, 10, 12)],
  ["Section 3", new Date(2024, 4, 9), new Date(2024, 4, 28)],
  ["Section 3", new Date(2024, 7, 28), new Date(2024, 8, 18)],
  ["Section 1", new Date(2024, 6, 28), new Date(2024, 7, 15)],
  ["Section 4", new Date(2024, 5, 28), new Date(2024, 6, 20)],
  ["Section 4", new Date(2024, 8, 18), new Date(2024, 9, 28)],
];

const Gantt = () => {
  const startDates = datalist.map((item) => item[1].getTime());
  const endDates = datalist.map((item) => item[2].getTime());
  const minStartDate = Math.min(...startDates);
  const maxEndDate = Math.max(...endDates);
  const totalTime = maxEndDate - minStartDate;

  // Group data by section
  const sectionGroups = datalist.reduce((acc, curr) => {
    const [section, startDate, endDate] = curr;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push({ startDate, endDate });
    return acc;
  }, {});

  return (
    <div className="bg-gray-800 p-5 rounded-lg flex flex-col items-center justify-center w-full h-full">
      <h1>Timeline</h1>
      <div className="flex w-full h-full">
        <div
          className="p-2 rounded-lg flex-1 flex flex-col gap-2 h-full"
          style={{ width: "calc(100% - 10rem)" }}
        >
          {Object.entries(sectionGroups).map(([section, dates], index) => (
            <div key={index} className="flex items-center gap-2 h-full">
              <div className="w-32 text-right pr-4">{section}</div>
              <div className="bg-gray-700 p-2 rounded-lg flex-1 flex flex-col gap-2 h-full">
                <div className="flex-1 relative h-full">
                  {dates.map((date, idx) => {
                    const duration =
                      date.endDate.getTime() - date.startDate.getTime();
                    const offset = date.startDate.getTime() - minStartDate;
                    const widthPercent = (duration / totalTime) * 100;
                    const leftPercent = (offset / totalTime) * 100;
                    return (
                      <div
                        key={idx}
                        className="bg-gray-400 p-2 rounded-lg absolute"
                        style={{
                          width: `${widthPercent}%`,
                          left: `${leftPercent}%`,
                          height: "100%",
                        }}
                      ></div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Gantt;
 */
import React from "react";

// Your updated data list
const datalist = [
  ["Section 1", new Date(2024, 3, 9), new Date(2024, 3, 25)],
  ["Section 2", new Date(2024, 4, 28), new Date(2024, 5, 25)],
  ["Section 2", new Date(2024, 0, 25), new Date(2024, 2, 20)],
  ["Section 3", new Date(2024, 2, 23), new Date(2024, 3, 5)],
  ["Section 4", new Date(2024, 3, 27), new Date(2024, 4, 8)],
  ["Section 5", new Date(2024, 4, 9), new Date(2024, 4, 28)],
  ["Section 6", new Date(2024, 9, 28), new Date(2024, 10, 1)],
  ["Section 6", new Date(2024, 7, 28), new Date(2024, 8, 18)],
  ["Section 8", new Date(2024, 6, 28), new Date(2024, 7, 15)],
  ["Section 9", new Date(2024, 5, 28), new Date(2024, 6, 20)],
  ["Section 11", new Date(2024, 8, 28), new Date(2024, 9, 12)],
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

  return (
    <div className="bg-gray-800 p-5 rounded-lg flex flex-col items-center justify-center w-full h-full">
      <h1>Timeline</h1>
      <div className="flex flex-col w-full h-full">
        <div
          className="flex flex-row gap-2"
          style={{ height: "90%", width: "95%" }}
        >
          <div className="flex flex-col" style={{ width: "10rem" }}>
            {datalist.map((item, index) => (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={index}
              >
                {item[0]}
              </div>
            ))}
          </div>

          <div className="bg-gray-700 rounded-lg flex-1 flex flex-col relative h-full">
            {/* Bars */}
            {datalist.map((item, index) => {
              const [section, startDate, endDate] = item;
              const duration = endDate.getTime() - startDate.getTime();
              const offset = startDate.getTime() - minStartDate;
              const widthPercent = (duration / totalTime) * 100;
              const marginLeftPercent = (offset / totalTime) * 100;
              if (index + 1)
                return (
                  <div
                    key={index}
                    className="bg-gray-400  rounded-lg mb-1"
                    style={{
                      width: `${widthPercent}%`,
                      marginLeft: `${marginLeftPercent}%`,
                      height: "100%",
                      zIndex: 99,
                    }}
                  ></div>
                );
            })}
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
                    position: "relative",
                    top: "100%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "row",
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
