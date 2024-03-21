/** @format */

"use client";
import dynamic from "next/dynamic";
import prisma from "../module/prismaClient";
import Gantt from "../components/Gantt";

export default function Page() {
  const datalist = [
    ["Washington", new Date(1801, 3, 29), new Date(1827, 2, 3)],
    ["Adams", new Date(1797, 2, 3), new Date(1801, 2, 3)],
    ["Jefferson", new Date(1801, 2, 3), new Date(1809, 2, 3)],
  ];

  return (
    <div className="flex flex-row gap-20 w-full h-full items-center justify-center">
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
