/** @format */

"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Gantt from "@/app/components/Gantt";

const datalist: [string, Date, Date][] = [
  ["Section 1", new Date(2024, 2, 20), new Date(2024, 4, 28)],
  ["Section 2", new Date(2024, 0, 25), new Date(2024, 2, 20)],
  ["Section 2", new Date(2024, 4, 28), new Date(2024, 8, 1)],
  ["Section 6", new Date(2024, 8, 1), new Date(2024, 10, 31)],
];

const ListOfInternships = () => {
  const searchParams = useSearchParams();
  const internship_id = searchParams.get("internship_id");
  const [internship, setInternships] = useState<Internship[]>([]);
  useEffect(() => {
    if (internship_id !== null) {
      fetch(`/api/internships/oneInternship?id=${internship_id}`)
        .then((res) => res.json())
        .then(setInternships);
    }
  }, [internship_id]);

  type Internship = {
    name: string;
    id: string;
    maxCapacity: number;
    currentCapacity: number;
    numberOfBeds: number;
    yearOfStudy: number;
    sectionId: string;
  };

  return (
    <div className="flex flex-col gap-20 w-full h-full items-center justify-center p-10 ">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col justify-center text-center">
          <h1 className="text-3xl font-semibold">{internship.name}</h1>
          <p>Max Capacity: {internship.maxCapacity}</p>
          <p>Current Capacity: {internship.currentCapacity}</p>
          <p>Number of Beds: {internship.numberOfBeds}</p>
          <p>Year of Study: {internship.yearOfStudy}</p>
          <p>Section ID: {internship.sectionId}</p>
        </div>
        <div>
          <p>{internship.maxCapacity}</p>
        </div>
      </div>
      <Gantt datalist={datalist} />
    </div>
  );
};

export default ListOfInternships;
