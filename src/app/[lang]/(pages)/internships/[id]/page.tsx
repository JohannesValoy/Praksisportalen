/** @format */

"use client";

import { useEffect, useState } from "react";
import Gantt from "@/app/components/Gantt";
import { getIndividualInternship } from "./actions";
import NotFound from "@/app/components/NotFound";

type DataItem = {
  id: number;
  row_id: number;
  name: string;
  startDate: Date;
  endDate: Date;
};

const InternshipComponent = ({ params }: { params: { id: number } }) => {
  const [datalist, setDatalist] = useState<DataItem[]>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  const [internship, setInternship] = useState<any>(null);
  useEffect(() => {
    if (params.id !== null) {
      getIndividualInternship(params.id)
        .then((data) => {
          setInternship(data);
          const dataList: DataItem[] = data.timeIntervals.map(
            (interval: any, index: number) => ({
              id: index + 1,
              row_id: interval.id,
              name: `Interval ${index + 1}`,
              startDate: new Date(interval.startDate),
              endDate: new Date(interval.endDate),
            })
          );
          setDatalist(dataList);
        })
        .catch((error) => {
          console.error("Failed to fetch internship details:", error);
          setNotFound(true);
        });
    }
  }, [params.id]);

  if (notFound) {
    return <NotFound />;
  }

  return (
    <>
      {internship ? (
        <div className="flex flex-col gap-6 p-10">
          <div className="flex flex-col ">
            <h1 className="text-3xl font-semibold">{internship.name}</h1>
            <p>Section: {internship.sectionName}</p>
            <p>Field: {internship.internshipField}</p>
            <p>Max Capacity: {internship.maxCapacity}</p>
            <p>Current Capacity: {internship.currentCapacity}</p>
            <p>Number of Beds: {internship.numberOfBeds}</p>
            <p>Year of Study: {internship.yearOfStudy}</p>
          </div>
          <div className="flex flex-row justify-center">
            <Gantt datalist={datalist} onClickUrl={"/profile?id="} />
          </div>
        </div>
      ) : (
        <p>Loading internship details...</p>
      )}
    </>
  );
};

export default InternshipComponent;
