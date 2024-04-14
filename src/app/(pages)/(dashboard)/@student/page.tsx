/** @format */

"use client";

import Gantt from "@/app/components/Gantt";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Student = {
  name: string;
  id: string;
};

interface DataItem {
  id: number;
  row_id: number;
  name: string;
  startDate: Date;
  endDate: Date;
}

const StudentLayout = () => {
  const searchParams = useSearchParams();
  const student_id = searchParams.get("id");
  const [student, setStudent] = useState<Student>();

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

  useEffect(() => {
    //TODO Replace with /api/users/me when me is implemented
    const url = student_id ? `/api/users/${student_id}` : "/api/users/1";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((error) => {
        console.error("Failed to fetch student", error);
      });
  }, [student_id]);

  return (
    <div className="flex flex-row w-full h-full items-center justify-center">
      {student ? (
        <div className="flex flex-row gap-20 w-full h-full items-center justify-center p-10 ">
          <Gantt datalist={datalist} onClickUrl="/internships?section_id=" />
          <div className="flex flex-col gap-5 items-center justify-center">
            <div
              style={{
                width: "15rem",
                height: "15rem",
                overflow: "hidden",
                borderRadius: "50%",
              }}
            >
              <div className="mask mask-squircle w-full h-full overflow-hidden">
                <Image
                  src="/example-profile-picture.jpg"
                  alt="Description"
                  className=" bg-neutral-300 h-full object-cover"
                  width={400}
                  height={400}
                  priority={true} // {false} | {true}
                />
              </div>
            </div>
            <h1>Hello, {student.name}</h1>
          </div>
        </div>
      ) : (
        <p>Loading internship details...</p>
      )}
    </div>
  );
};

export default StudentLayout;
