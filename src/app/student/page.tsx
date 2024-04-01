/** @format */

"use client";
import dynamic from "next/dynamic";
import Gantt from "../components/Gantt";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Student = {
  name: string;
  id: string;
};

export default function Page() {
  const searchParams = useSearchParams();
  const student_id = searchParams.get("id");
  const [student, setStudent] = useState<Student>();

  const datalist: [string, Date, Date][] = [
    ["Section 1", new Date(2024, 2, 20), new Date(2024, 4, 28)],
    ["Section 2", new Date(2024, 0, 25), new Date(2024, 2, 20)],
    ["Section 2", new Date(2024, 4, 28), new Date(2024, 8, 1)],
    ["Section 6", new Date(2024, 8, 1), new Date(2024, 10, 31)],
  ];

  useEffect(() => {
    fetch(`/api/users/${student_id}`) // Adjusted the fetch URL to match backend routing.
      .then((res) => res.json())
      .then((data) => setStudent(data)) // Ensure proper data handling.
      .catch((error) => {
        console.error("Failed to fetch one student", error); // Error handling.
        fetch(`/api/users/student`)
          .then((res) => res.json())
          .then((data) => setStudent(data))
          .catch((error) => console.error("Failed to fetch student", error));
      });
  }, [student_id]);

  return (
    <div className="flex flex-row w-full h-full items-center justify-center">
      {student ? (
        <div className="flex flex-row gap-20 w-full h-full items-center justify-center p-10 ">
          <Gantt datalist={datalist} />
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
}
