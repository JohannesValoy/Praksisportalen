/** @format */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Dropdown from "@/app/components/Dropdown";

export default function Page() {
  const router = useRouter();

  const [name, setname] = useState("");
  const [sectionType, setSectionType] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [department_id, setDepartment_id] = useState("");

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

  const [departments, setDepartments] = useState<Department[]>([]);
  type Department = {
    name: string;
    id: string;
  };

  useEffect(() => {
    fetch(`/api/departments`) // Adjusted the fetch URL to match backend routing.
      .then((res) => res.json())
      .then((data) => setDepartments(data.elements)) // Ensure proper data handling.
      .catch((error) => console.error("Failed to fetch users", error)); // Error handling.
  }, []);

  // Initialize sectionTypes as an array of SectionType
  const [sectionTypes, setSectionTypes] = useState<SectionType[]>([]);
  const [newType, setNewType] = useState("");

  // Add a new type for SectionType
  type SectionType = {
    name: string;
  };

  // Fetch section types from the API
  useEffect(() => {
    fetch(`/api/sections/sectionTypes`) // Adjust the fetch URL to match backend routing.
      .then((res) => res.json())
      .then((data) => setSectionTypes(data)) // Ensure proper data handling.
      .catch((error) => console.error("Failed to fetch section types", error)); // Error handling.
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

  const handleAddType = async () => {
    const response = await fetch("/api/sections/sectionTypes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newType }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Fetch the updated list of section types
    fetch(`/api/sections/sectionTypes`)
      .then((res) => res.json())
      .then((data) => setSectionTypes(data))
      .catch((error) => console.error("Failed to fetch section types", error));

    setNewType(""); // Clear the input field
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full h-full"
    >
      <div style={{ width: "50rem" }}>
        <h1 className="flex justify-center text-4xl font-bold mb-4">
          Add Section
        </h1>
        <label className="form-control w-full mb-2">
          <div className="label">
            <span className="label-text text-xl">Section Name</span>
          </div>
          <input
            type="text"
            placeholder="Section Name"
            className="input input-bordered w-full"
            onChange={(e) => setname(e.target.value)}
            required
          />
        </label>
        <div className="flex flex-row   mb-2">
          <Dropdown
            dropdownName="Leader"
            options={users}
            selectedOption={
              users.find((user) => user.id === employee_id) || null
            }
            setSelectedOption={(user) => setEmployee_id(user.id)}
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
            required
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
        <div className="flex flex-row mb-2">
          <Dropdown
            dropdownName="Department"
            options={departments}
            selectedOption={
              departments.find(
                (department) => department.id === department_id,
              ) || null
            }
            setSelectedOption={(department) => setDepartment_id(department.id)}
            renderOption={(department) => (
              <>
                <th>
                  <div className="mask mask-squircle w-12 h-12 overflow-hidden"></div>
                </th>
                <td>{department.name}</td>
              </>
            )}
            required
          />
          <button>
            <a
              href={`/departments/addDepartment`}
              className="btn btn-primary h-full"
            >
              Add Department
            </a>
          </button>
        </div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-xl">Section Type</span>
          </div>
        </label>
        <Dropdown
          dropdownName="Section Type"
          options={sectionTypes}
          selectedOption={
            sectionTypes.find((type) => type.name === sectionType) || null
          }
          setSelectedOption={(type) => setSectionType(type.name)}
          renderOption={(type) => (
            <>
              <th>
                <div className="mask mask-squircle w-12 h-12 overflow-hidden "></div>
              </th>
              <td>{type.name}</td>
            </>
          )}
          required
        />
        <div className="flex flex-row mt-2">
          <input
            type="text"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            placeholder="Enter new section type"
            className="input input-bordered w-full"
          />
          <button className="btn btn-secondary h-full" onClick={handleAddType}>
            Add new type
          </button>
        </div>
        <div className="flex w-full justify-center p-10 gap-5">
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
      </div>
    </form>
  );
}
