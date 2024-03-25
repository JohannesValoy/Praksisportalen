/** @format */

"use client";

import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "user";

  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      <div className="justify-center items-center" style={{ width: "50rem" }}>
        <h1>Add {role}</h1>
        <div className="flex flex-row ">
          <div className="w-full">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="flex flex-col gap-5 items-center justify-center w-full">
            <div
              style={{
                width: "10rem",
                height: "10rem",
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
          </div>
        </div>

        <div className="flex flex-row gap-5 w-full">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Phone Number</span>
            </div>
            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />
          </label>
        </div>
        <div className="flex w-full justify-center p-10 gap-5">
          <button className="btn w-20">Cancel</button>
          <button className="btn btn-primary w-20">Save</button>
        </div>
      </div>
    </main>
  );
}
