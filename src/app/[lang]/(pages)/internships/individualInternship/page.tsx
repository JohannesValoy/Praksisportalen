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

// Assuming datalist is used elsewhere in your component for a Gantt chart

const datalist: DataItem[] = [
  {
    id: 1,
    row_id: 1,
    name: "Section 1",
    startDate: new Date(2024, 2, 20),
    endDate: new Date(2024, 4, 28),
  },
  {
    id: 2,
    row_id: 2,
    name: "Section 2",
    startDate: new Date(2024, 0, 25),
    endDate: new Date(2024, 2, 20),
  },
  {
    id: 3,
    row_id: 2,
    name: "Section 2",
    startDate: new Date(2024, 4, 28),
    endDate: new Date(2024, 8, 1),
  },
  {
    id: 4,
    row_id: 6,
    name: "Section 6",
    startDate: new Date(2024, 8, 1),
    endDate: new Date(2024, 10, 31),
  },
];

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
  const internship_id = searchParams.get("internship_id");
  const [internship, setInternship] = useState<Internship | null>(null);

  useEffect(() => {
    if (internship_id !== null) {
      fetch(`/api/internships/${internship_id}`)
        .then((res) => res.json())
        .then((data) => setInternship(data))
        .catch((error) =>
          console.error("Failed to fetch internship details:", error),
        );
    }
  }, [internship_id]);

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
