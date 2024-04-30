/** @format */

"use client";

import Dropdown from "@/app/components/Dropdown";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [employee_id, setEmployee_id] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  type User = {
    name: string;
    email: string;
    id: string;
  };

  useEffect(() => {
    fetch(`/api/users?role=${"employee"}`) // Adjusted the fetch URL to match backend routing.
      .then((res) => res.json())
      .then((data) => setUsers(data.elements)) // Ensure proper data handling.
      .catch((error) => console.error("Failed to fetch users", error)); // Error handling.
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, employee_id }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    router.back();
  };
  const selectedUser = users.find((user) => user.id === employee_id);

  return (
    <form
      className="flex flex-col items-center justify-center w-full h-full"
      onSubmit={handleSubmit}
    >
      <div className="justify-center items-center " style={{ width: "50rem" }}>
        <h1>Add Department</h1>
        <label className="form-control pb-2 ">
          <div className="label">
            <span className="label-text">First Name</span>
          </div>
          <input
            type="name"
            placeholder="First Name"
            className="input input-bordered w-full"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <div className="flex flex-row mb-2">
          <Dropdown
            dropdownName="Leader"
            options={users}
            selectedOption={
              users.find((user) => user.id === employee_id) || null
            }
            setSelectedOption={(user) => setEmployee_id(user.id.toString())}
            renderOption={(user) => (
              <>
                <div>
                  <div className="mask mask-squircle w-12 h-12 overflow-hidden">
                    <Image
                      src="/example-profile-picture.jpg"
                      alt="Description"
                      className=" bg-neutral-300 h-full object-cover"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                <div>{user.name}</div>
                <div>{user.email}</div>
              </>
            )}
          />
          <button>
            <a
              href={`/admin/addUser?role=${"employee"}`}
              className="btn btn-primary h-full"
            >
              Add Employee
            </a>
          </button>
        </div>
      </div>
      <div className="flex flex-row"></div>

      <div className="flex w-full justify-center p-10 gap-5">
        <button className="btn w-20" onClick={() => router.back()}>
          Cancel
        </button>
        <button className="btn btn-accent w-20" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
