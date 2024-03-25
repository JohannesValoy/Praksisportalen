/** @format */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
  const router = useRouter();

  const [name, setname] = useState("");
  const [sectionType, setSectionType] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [department_id, setDepartment_id] = useState("");
  console.log(employee_id);
  console.log(name);
  console.log(sectionType);
  console.log(department_id);

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

  const [departments, setDepartments] = useState<Department[]>([]);
  type Department = {
    name: string;
    id: string;
  };

  useEffect(() => {
    fetch(`/api/departments`) // Adjusted the fetch URL to match backend routing.
      .then((res) => res.json())
      .then((data) => setDepartments(data)) // Ensure proper data handling.
      .catch((error) => console.error("Failed to fetch users", error)); // Error handling.
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/sections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, sectionType, employee_id, department_id }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    router.back();
  };
  const selectedUser = users.find((user) => user.id === employee_id);
  const selectedDepartment = departments.find(
    (department) => department.id === department_id
  );

  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      <div className="justify-center items-center" style={{ width: "50rem" }}>
        <h1>Add Section</h1>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Section Name</span>
          </div>
          <input
            type="text"
            placeholder="Section Name"
            className="input input-bordered w-full"
            onChange={(e) => setname(e.target.value)}
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
                <tbody key={index} className="m-2 p-1">
                  <tr
                    onClick={() => setEmployee_id(user?.id)}
                    className="btn w-full flex flex-row justify-start items-center p-2 h-fit"
                  >
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
          <button>
            <a
              href={`/admin/addUser?role=${"employee"}`}
              className="btn btn-primary h-full p-5"
            >
              Add employee
            </a>
          </button>
        </div>
        <div className="flex flex-row m-1 gap-2">
          <div className="dropdown dropdown-end w-full">
            <div tabIndex={0} role="button" className="btn w-full h-full">
              {selectedDepartment ? (
                <div className="flex flex-row justify-start items-center gap-5 w-full p-3">
                  <div className="mask mask-squircle w-12 h-12 overflow-hidden"></div>
                  <div>{selectedDepartment.name}</div>
                </div>
              ) : (
                "Department Name"
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-full"
            >
              {departments.map((department, index) => (
                <tbody key={index} className="m-2 p-1">
                  <tr
                    onClick={() => setDepartment_id(department?.id)}
                    className="btn w-full flex flex-row justify-start items-center p-2 h-fit"
                  >
                    <th>
                      <div className="mask mask-squircle w-12 h-12 overflow-hidden"></div>
                    </th>
                    <td>{department.name}</td>
                  </tr>
                </tbody>
              ))}
            </ul>
          </div>
          <button>
            <a
              href={`/admin/administerDepartments/addDepartment`}
              className="btn btn-primary h-full p-5"
            >
              Add Department
            </a>
          </button>
        </div>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Section Type</span>
          </div>
          <input
            type="text"
            placeholder="Section Type"
            className="input input-bordered w-full"
            onChange={(e) => setSectionType(e.target.value)}
          />
        </label>
        <div className="flex flex-row"></div>

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
