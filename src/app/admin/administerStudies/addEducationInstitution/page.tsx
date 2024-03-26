/** @format */

"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
  const router = useRouter();

  const [name, setame] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/educationInstitutions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    router.back();
  };

  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      <div className="justify-center items-center" style={{ width: "50rem" }}>
        <h1>Add Study Program</h1>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Study Program Name</span>
          </div>
          <input
            type="text"
            placeholder="Study Program Name"
            className="input input-bordered w-full"
            onChange={(e) => setame(e.target.value)}
          />
        </label>

        <div className="flex w-full justify-center p-10 gap-5">
          <button className="btn w-20" onClick={() => router.back()}>
            Cancel
          </button>
          <button className="btn btn-primary w-20" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </main>
  );
}
