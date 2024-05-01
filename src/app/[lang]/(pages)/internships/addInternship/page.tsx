"use client";

import { Section } from "@/app/_models/Section";
import Dropdown from "@/app/components/Dropdown";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getInternshipTypes } from "../action";
import { InternshipFieldTable } from "knex/types/tables.js";

/**
 * Creates a page to add an internship.
 * @returns A page to add an internship.
 */
export default function Page() {
  const [name, setName] = useState("");
  const [sections, setSections] = useState<Section[]>([]);

  const [section_id, setSections_id] = useState(0);
  const [field, setField] = useState("");
  const [newField, setNewField] = useState("");
  const [internshipFields, setFields] = useState<InternshipFieldTable[]>([]);
  const [currentCapacity, setCurrentCapacity] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [numberOfBeds, setNumberOfBeds] = useState(0);
  const [yearOfStudy, setYearOfStudy] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const sectionsResponse = await fetch(`/api/sections`).then((res) =>
          res.json(),
        );
        setSections(sectionsResponse || []);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    getInternshipTypes() // Adjust the fetch URL to match backend routing.
      .then((data) => setFields(data)) // Ensure proper data handling.
      .catch((error) => console.error("Failed to fetch section types", error)); // Error handling.
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
        internship_field: field,
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

  const convert = (data) => {
    return data.map((item) => {
      return {
        id: item.id.toString(),
        name: item.name,
      };
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full max-w-[50rem] mx-auto m-10 flex flex-col items-center"
    >
      Add Internship
      <label className="form-control w-full mb-2">
        <div className="label">
          <span className="label-text text-xl">Internship Name</span>
        </div>
        <input
          type="text"
          placeholder="Internship Name"
          className="input input-bordered w-full"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-xl">Section</span>
        </div>
      </label>
      <Dropdown
        dropdownName="Section"
        options={sections.map((section) => ({
          id: section.id.toString(),
          name: section.name,
        }))}
        selectedOption={
          Array.isArray(sections)
            ? convert(
                sections.find((currSections) => currSections.id === section_id),
              )
            : null
        }
        setSelectedOption={(currSections) =>
          setSections_id(Number(currSections.id))
        }
        renderOption={(currSections) => <div>{currSections.name}</div>}
        required
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
        required
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
          onChange={(e) => setCurrentCapacity(Number(e.target.value))}
          min={0}
          required
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
          onChange={(e) => setMaxCapacity(Number(e.target.value))}
          min={0}
          required
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
          onChange={(e) => setNumberOfBeds(Number(e.target.value))}
          defaultValue={0}
          min={0}
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
          onChange={(e) => setYearOfStudy(Number(e.target.value))}
          min={0}
          required
        />
      </label>
      <div className="flex flex-row"></div>
      <div className="flex w-full justify-center p-10 gap-5">
        <button className="btn w-20" onClick={() => router.back()}>
          Cancel
        </button>
        <button type="submit" className="btn btn-accent w-20">
          Save
        </button>
      </div>
    </form>
  );
}
