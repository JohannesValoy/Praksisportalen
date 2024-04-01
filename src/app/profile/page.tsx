/** @format */

"use client";
import dynamic from "next/dynamic";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Employee = {
  name: string;
  id: string;
  email: string;
};

export default function Page() {
  const searchParams = useSearchParams();
  const employee_id = searchParams.get("id");
  const [employee, setEmployee] = useState<Employee>();

  useEffect(() => {
    fetch(`/api/users/${employee_id}`) // Adjusted the fetch URL to match backend routing.
      .then((res) => res.json())
      .then((data) => setEmployee(data)) // Ensure proper data handling.
      .catch((error) => {
        console.error("Failed to fetch one employee", error); // Error handling.
        fetch(`/api/users/employee`)
          .then((res) => res.json())
          .then((data) => setEmployee(data))
          .catch((error) => console.error("Failed to fetch employee", error));
      });
  }, [employee_id]);

  return (
    <div className="flex flex-row w-full h-full items-center justify-center">
      {employee ? (
        <div className="flex flex-row gap-20 w-full h-full items-center justify-center p-10 ">
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
            <h1>{employee.name}</h1>
            <p>ID: {employee.id}</p>
            <p>Email: {employee.email}</p>
            <ul className="text-center">
              List of sections
              <li>Not yet implemented</li>
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading Profile details...</p>
      )}
    </div>
  );
}
