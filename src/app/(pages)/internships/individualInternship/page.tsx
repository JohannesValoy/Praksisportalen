/** @format */

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Gantt from "@/app/components/Gantt";
import { on } from "events";

type DataItem = {
  id: number;
  row_id: number;
  name: string;
  startDate: Date;
  endDate: Date;
};
// Redefined Internship type to include leader information
type Internship = {
  id: number;
  name: string;
  internship_field: string;
  maxCapacity: number;
  currentCapacity: number;
  numberOfBeds: number;
  yearOfStudy: number;
  created_at: Date;
  updated_at: Date;
  // Section details
  section_name: string;
  section_id: number;
  // Leader (employee) details
  leader_id: number;
  leader_name: string;
  leader_email: string;
  leader_role: string;
  leader_created_at: Date;
  leader_updated_at: Date;
};

const InternshipComponent = () => {
  const searchParams = useSearchParams();
  const [datalist, setDatalist] = useState<DataItem[]>(null);

  const internship_id = searchParams.get("internship_id");
  const [internship, setInternship] = useState<Internship | null>(null);
  useEffect(() => {
    if (internship_id !== null) {
      fetch(`/api/internships/${internship_id}`)
        .then((res) => res.json())
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
        .catch((error) =>
          console.error("Failed to fetch internship details:", error)
        );
    }
  }, [internship_id]);
  console.log(internship);
  return (
    <div className=" w-full h-full">
      {internship ? (
        <div className="flex flex-col gap-20w-full h-full items-center justify-center p-10">
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col justify-center text-center">
              <h1 className="text-3xl font-semibold">{internship.name}</h1>
              <p>Section: {internship.section_name}</p>
              <p>SectionID: {internship.section_id}</p>
              <p>Field: {internship.internship_field}</p>
              <p>Max Capacity: {internship.maxCapacity}</p>
              <p>Current Capacity: {internship.currentCapacity}</p>
              <p>Number of Beds: {internship.numberOfBeds}</p>
              <p>Year of Study: {internship.yearOfStudy}</p>
            </div>
            <div
              onClick={() => {
                window.location.href = `/profile?id=${internship.leader_id}`;
              }}
              className="btn btn-ghost btn-xl"
            >
              <div>
                <h2 className="text-2xl font-semibold">
                  {internship.leader_name}
                </h2>
                <p>{internship.leader_email}</p>
              </div>
            </div>
          </div>
          <Gantt datalist={datalist} onClickUrl={"/profile?id="} />
        </div>
      ) : (
        <p>Loading internship details...</p>
      )}
    </div>
  );
};

export default InternshipComponent;
