"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/educationInstitutions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    router.back();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 items-center justify-center w-full h-full"
    >
      <h1 className="flex justify-center text-4xl font-bold">
        Add Education Institution
      </h1>
      <div>
        <label className="form-control w-full mb-2" htmlFor="name"></label>
        <input
          type="text"
          id="name"
          placeholder="Education Institution Name"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex w-full justify-center gap-5">
        <button
          type="button"
          className="btn w-20"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-accent w-20">
          Save
        </button>
      </div>
    </form>
  );
}
