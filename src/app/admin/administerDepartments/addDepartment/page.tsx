/** @format */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
  const router = useRouter();

  const [name, setname] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  console.log(employee_id);
  console.log(name);

  const [users, setUsers] = useState<User[]>([]);
  type User = {
    name: string;
    email: string;
    id: string;
  };

  useEffect(() => {
    fetch(`/api/users?role=${"employee"}`) // Adjusted the fetch URL to match backend routing.
      .then((res) => res.json())
      .then((data) => setUsers(data)) // Ensure proper data handling.
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
    <main className="flex flex-col items-center justify-center w-full h-full">
      <div className="justify-center items-center" style={{ width: "50rem" }}>
        <h1>Add Department</h1>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Department Name</span>
          </div>
          <input
            type="text"
            placeholder="Department Name"
            className="input input-bordered w-full"
            onChange={(e) => setname(e.target.value)}
          />
        </label>
        <div className="dropdown dropdown-end w-full">
          <div tabIndex={0} role="button" className="btn m-1 w-full h-fit">
            {selectedUser ? (
              <div className="flex flex-row justify-start items-center gap-5 w-full p-5">
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
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
          >
            {users.map((user, index) => (
              <tbody key={index}>
                <tr onClick={() => setEmployee_id(user?.id)}>
                  <th>
                    <div className="mask mask-squircle w-12 h-12 overflow-hidden">
                      <Image
                        src="/example-profile-picture.jpg"
                        alt="Description"
                        className=" bg-neutral-300 h-full object-cover"
                        width={100}
                        height={100}
                      />
                    </div>
                  </th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              </tbody>
            ))}
          </ul>
        </div>
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
