/** @format */
"use client";

import Dropdown from "@/app/components/Dropdown";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [name, setname] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [section_id, setSections_id] = useState(0);
  const [field, setField] = useState("");
  const [newField, setNewField] = useState("");
  const [internshipFields, setFields] = useState<Fields[]>([]);
  const [currentCapacity, setCurrentCapacity] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [numberOfBeds, setNumberOfBeds] = useState(0);
  const [yearOfStudy, setYearOfStudy] = useState(0);

  const router = useRouter();

  type Section = {
    name: string;
    id: string;
  };

  type Fields = {
    name: string;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const sectionsResponse = await fetch(`/api/sections`).then((res) =>
          res.json()
        );
        setSections(sectionsResponse || []);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchAllData();
  }, []);

  const handleAddField = async () => {
    const response = await fetch("/api/internships/internshipFields", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newField,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Fetch the updated list of section types
    fetch(`/api/internships/internshipFields`)
      .then((res) => res.json())
      .then((data) => setFields(data))
      .catch((error) => console.error("Failed to fetch section types", error));

    setNewField(""); // Clear the input field
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/internships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        field,
        maxCapacity,
        currentCapacity,
        numberOfBeds,
        yearOfStudy,
        section_id,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    router.back();
  };

  return (
    <main className="w-full h-full flex flex-col items-center">
      Add Internship
      <label className="form-control w-full mb-2">
        <div className="label">
          <span className="label-text text-xl">Internship Name</span>
        </div>
        <input
          type="text"
          placeholder="Section Name"
          className="input input-bordered w-full"
          onChange={(e) => setname(e.target.value)}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-xl">Section</span>
        </div>
      </label>
      <Dropdown
        dropdownName="Section"
        options={sections}
        selectedOption={
          sections.find((currSections) => currSections.id === section_id) ||
          null
        }
        setSelectedOption={(currSections) => setSections_id(currSections.id)}
        renderOption={(currSections) => <div>{currSections.name}</div>}
      />
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-xl">Internship Field</span>
        </div>
      </label>
      <Dropdown
        dropdownName="Internship Field"
        options={internshipFields}
        selectedOption={
          internshipFields.find((currField) => currField.name === field) || null
        }
        setSelectedOption={(currField) => setField(currField.name)}
        renderOption={(currField) => <div>{currField.name}</div>}
      />
      <div className="flex flex-row mt-2">
        <input
          type="text"
          value={newField}
          onChange={(e) => setNewField(e.target.value)}
          placeholder="Enter new internship field"
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary h-full" onClick={handleAddField}>
          Add new field
        </button>
      </div>
      <label className="form-control w-full mb-2">
        <div className="label">
          <span className="label-text text-xl">Number of Intern Spots</span>
        </div>
        <input
          type="number"
          placeholder="Number of intern Spots"
          className="input input-bordered w-full"
          onChange={(e) => setCurrentCapacity(e.target.value)}
        />
      </label>
      <label className="form-control w-full mb-2">
        <div className="label">
          <span className="label-text text-xl">Max Capacity</span>
        </div>
        <input
          type="number"
          placeholder="Max Capacity"
          className="input input-bordered w-full"
          onChange={(e) => setMaxCapacity(e.target.value)}
        />
      </label>
      <label className="form-control w-full mb-2">
        <div className="label">
          <span className="label-text text-xl">Number of Beds</span>
        </div>
        <input
          type="number"
          placeholder="Number of Beds"
          className="input input-bordered w-full"
          onChange={(e) => setNumberOfBeds(e.target.value)}
        />
      </label>
      <label className="form-control w-full mb-2">
        <div className="label">
          <span className="label-text text-xl">Year of Study</span>
        </div>
        <input
          type="number"
          placeholder="Year of Study"
          className="input input-bordered w-full"
          onChange={(e) => setYearOfStudy(e.target.value)}
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
    </main>
  );
}
