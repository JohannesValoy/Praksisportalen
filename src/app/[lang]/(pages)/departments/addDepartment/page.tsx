/** @format */

"use client";

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
      <div className="justify-center items-center" style={{ width: "50rem" }}>
        <h1>Add Department</h1>
        <label className="form-control ">
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
        <div className="flex flex-row m-1 gap-2">
          <div className="dropdown dropdown-end w-full">
            <div tabIndex={0} role="button" className="btn w-full h-full">
              {selectedUser ? (
                <div className="flex flex-row justify-start items-center gap-5 w-full p-3">
                  <div className="mask mask-squircle w-12 h-12 overflow-hidden">
                    <Image
                      src="/example-profile-picture.jpg"
                      alt="Description"
                      className=" bg-neutral-300 h-full object-cover"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div>{selectedUser.name}</div>
                  <div>{selectedUser.email}</div>
                </div>
              ) : (
                "Leader Name"
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-full"
            >
              {users.map((user, index) => (
                <div key={index} className="m-2 p-1">
                  <div
                    onClick={() => setEmployee_id(user?.id)}
                    className="btn w-full flex flex-row justify-start items-center p-2 h-fit"
                  >
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
                  </div>
                </div>
              ))}
            </ul>
          </div>
          <button>
            <a
              href={`/admin/addUser?role=${"employee"}`}
              className="btn btn-primary h-full p-5"
            >
              Add employee
            </a>
          </button>
        </div>
        <div className="flex flex-row"></div>

        <div className="flex w-full justify-center p-10 gap-5">
          <button className="btn w-20" onClick={() => router.back()}>
            Cancel
          </button>
          <button className="btn btn-primary w-20" type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
