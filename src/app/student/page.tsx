/** @format */

"use client";
import dynamic from "next/dynamic";
import prisma from "../module/prismaClient";
import Gantt from "../components/Gantt";

export default function Page() {
  const datalist = [
    ["Section 1", new Date(2024, 3, 9), new Date(2024, 3, 25)],
    ["Section 1", new Date(2024, 2, 3), new Date(2024, 2, 20)],
    ["Section 3", new Date(2024, 2, 23), new Date(2024, 3, 5)],
    ["Section 2", new Date(2024, 3, 27), new Date(2024, 4, 8)],
    ["Section 4", new Date(2024, 4, 9), new Date(2024, 4, 28)],
    ["Section ", new Date(2024, 4, 28), new Date(2024, 5, 12)],
  ];

  return (
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
          <img
            src="example-profile-picture.jpg"
            alt="Description"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
        <h1>Hello, Student home page!</h1>
      </div>
    </div>
  );
}
