/** @format */

import dynamic from "next/dynamic";
import Gantt from "../components/Gantt";
import Image from "next/image";

export default function Page() {
  const datalist = [
    ["Section 1", new Date(2024, 2, 20), new Date(2024, 4, 28)],
    ["Section 2", new Date(2024, 0, 25), new Date(2024, 2, 20)],
    ["Section 2", new Date(2024, 4, 28), new Date(2024, 8, 1)],
    ["Section 6", new Date(2024, 8, 1), new Date(2024, 10, 31)],
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
          <div className="mask mask-squircle w-full h-full overflow-hidden">
            <Image
              src="/example-profile-picture.jpg"
              alt="Description"
              className=" bg-neutral-300 h-full object-cover"
              width={400}
              height={400}
              objectFit="cover"
            />
          </div>
        </div>
        <h1>Hello, Student home page!</h1>
      </div>
    </div>
  );
}
