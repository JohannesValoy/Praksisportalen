/** @format */
"use client";
// `app/page.tsx` is the UI for the `/` URL
import Gantt from "../components/Gantt";
export default function Page() {
  return (
    <div className="flex flex-row gap-20 w-full h-full items-center justify-center">
      <Gantt />
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
