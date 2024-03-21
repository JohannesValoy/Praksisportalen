/** @format */

import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [
    { type: "string", id: "departmentID" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ],
];

const Gantt = ({ datalist }) => {
  return (
    <Chart
      chartType="Timeline"
      data={[...data, ...datalist]}
      width="100%"
      height="100%"
    />
  );
};

export default Gantt;
