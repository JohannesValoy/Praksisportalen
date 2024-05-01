"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

/**
 * Creates a page to add a user.
 * @returns A page to add a user.
 */
export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "user";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [countryCode, setCountryCode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    const response = await fetch(`/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phoneNumber: fullPhoneNumber,
        role,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center">
      <div className="flex-col">
        <h1 className="text-3xl mb-2">Add {role}</h1>
        <div className="flex flex-row ">
          <div className="w-full">
            <label className="form-control ">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="name"
                placeholder="First Name"
                className="input input-bordered w-full"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="name"
                placeholder="Last Name"
                className="input input-bordered w-full"
                onChange={(e) => setLastName(e.target.value)}
                required
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
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <div className="flex flex-row gap-5 w-full">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Country Code</span>
              </div>
              <select
                className="input input-bordered w-full"
                onChange={(e) => setCountryCode(e.target.value)}
                required
              >
                <option value="+47">Norway (+47)</option>
                {/* Add more options for other countries here */}
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Phone Number</span>
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="input input-bordered w-full"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </label>
          </div>
        </div>
        <div className="flex w-full justify-center p-10 gap-5">
          <button
            type="button"
            className="btn w-20"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button className="btn btn-accent w-20" type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
