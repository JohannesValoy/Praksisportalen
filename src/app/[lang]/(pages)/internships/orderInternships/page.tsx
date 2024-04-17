/** @format */

"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Dropdown from "@/app/components/Dropdown";

export default function Page() {
  const router = useRouter();

  const [studyProgram_id, setStudyProgram_id] = useState("");
  const [internshipField, setInternshipField] = useState("");
  const [comment, setComment] = useState("");
  const [fieldGroups, setFieldGroups] = useState([]);

  const initialSubFieldGroups = [
    {
      studyYear: "1. års studenter",
      numStudents: 0,
      startWeek: "",
      endWeek: "",
    },
    {
      studyYear: "2. års studenter",
      numStudents: 0,
      startWeek: "",
      endWeek: "",
    },
    {
      studyYear: "3. års studenter",
      numStudents: 0,
      startWeek: "",
      endWeek: "",
    },
  ];

  function weekStringToDate(weekString) {
    const [year, week] = weekString.split("-W");
    const date = new Date(year);
    date.setDate(date.getDate() + (week - 1) * 7);
    return date;
  }

  // Add a new field group with its own subFieldGroups
  const addGroup = () => {
    const id = Math.random();
    setFieldGroups((prevFieldGroups) => ({
      ...prevFieldGroups,
      [id]: {
        internshipField: "",
        subFieldGroups: initialSubFieldGroups,
      },
    }));
  };

  // Delete a field group
  const handleDeleteButtonClick = (id) => {
    setFieldGroups((prevFieldGroups) => {
      const newFieldGroups = { ...prevFieldGroups };
      delete newFieldGroups[id];
      return newFieldGroups;
    });
  };

  const [studyPrograms, setStudyPrograms] = useState<StudyProgram[]>([]);
  type StudyProgram = {
    id: string;
    name: string;
    educationInstitution_id: string;
  };

  useEffect(() => {
    fetch(`/api/studyPrograms`) // Adjusted the fetch URL to match backend routing.
      .then((res) => res.json())
      .then((data) => setStudyPrograms(data)) // Ensure proper data handling.
      .catch((error) => console.error("Failed to fetch users", error)); // Error handling.
  }, []);

  // Initialize internshipFields as an array of InternshipField
  const [internshipFields, setInternshipFields] = useState<InternshipField[]>(
    [],
  );
  const [newType, setNewType] = useState("");

  // Add a new type for InternshipField
  type InternshipField = {
    name: string;
  };

  // Fetch internship field from the API
  useEffect(() => {
    fetch(`/api/internships/internshipFields`) // Adjust the fetch URL to match backend routing.
      .then((res) => res.json())
      .then((data) => setInternshipFields(data)) // Ensure proper data handling.
      .catch((error) => console.error("Failed to fetch section types", error)); // Error handling.
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    router.back();
  };

  const handleAddType = async () => {
    const response = await fetch("/api/internships/internshipFields", {
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
    fetch(`/api/internships/internshipFields`)
      .then((res) => res.json())
      .then((data) => setInternshipFields(data))
      .catch((error) => console.error("Failed to fetch section types", error));

    setNewType(""); // Clear the input field
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center w-full h-full">
        <h1 className="flex justify-center text-4xl font-bold mb-4">
          Behov for praksisplasser
        </h1>

        <div className="mb-2">
          <span className="label-text text-xl">Studieprogram</span>
        </div>
        <div className="flex flex-row mb-2 gap-2">
          <Dropdown
            dropdownName="studieprogram"
            options={studyPrograms}
            selectedOption={
              studyPrograms.find(
                (studyProgram) => studyProgram.id === studyProgram_id,
              ) || null
            }
            setSelectedOption={(studyProgram) =>
              setStudyProgram_id(studyProgram.id)
            }
            renderOption={(studyProgram) => (
              <>
                <th>
                  <div className="mask mask-squircle w-12 h-12 overflow-hidden"></div>
                </th>
                <td>{studyProgram.name}</td>
              </>
            )}
            required
          />
          <button type="button">
            <a href={`/studyPrograms`} className="btn btn-secondary">
              Nytt studieprogram
            </a>
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(fieldGroups).map(([groupId, group]) => (
            <div
              key={groupId}
              className="group relative justify-centers rounded-3xl bg-base-200 mb-2 p-8"
            >
              <div className="flex flex-row items-center">
                <div className=" w-full">
                  <span className="label-text text-2xl">Praksisfelt</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteButtonClick(groupId)}
                  className="btn btn-error rounded-full m-2"
                >
                  X
                </button>
              </div>
              <Dropdown
                dropdownName="Praksisfelt"
                options={internshipFields}
                selectedOption={
                  internshipFields.find(
                    (type) => type.name === internshipField,
                  ) || null
                }
                setSelectedOption={(type) => setInternshipField(type.name)}
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
              <div className="flex flex-row mt-2 gap-2">
                <input
                  type="text"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  placeholder="Legg til nytt praksisfelt"
                  className="input input-bordered w-full"
                  aria-label="Add new type"
                />
                <button
                  type="button"
                  className="btn btn-secondary h-full"
                  onClick={handleAddType}
                >
                  Legg til
                </button>
              </div>
              <div className="flex flex-row mt-2">
                {group.subFieldGroups.map((subFieldGroup, index) => (
                  <div key={index} className="mr-4">
                    <div className="label  w-full">
                      <span className="label-text text-xl">
                        {subFieldGroup.studyYear}
                      </span>
                    </div>

                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text text-xl">
                          Antall Studenter
                        </span>
                      </div>
                      <input
                        type="number"
                        min="0"
                        value={subFieldGroup.numStudents}
                        onChange={(e) => {
                          const newFieldGroups = { ...fieldGroups };
                          newFieldGroups[groupId].subFieldGroups[
                            index
                          ].numStudents = e.target.value;
                          setFieldGroups(newFieldGroups);
                        }}
                        className="input input-bordered"
                        required
                      />
                    </label>

                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text text-xl">Start Uke</span>
                      </div>
                      <input
                        type="week"
                        value={subFieldGroup.startWeek}
                        className={`input input-bordered`}
                        onChange={(e) => {
                          const newFieldGroups = { ...fieldGroups };
                          newFieldGroups[groupId].subFieldGroups[
                            index
                          ].startWeek = e.target.value;
                          setFieldGroups(newFieldGroups);
                        }}
                        required
                      />
                    </label>

                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text text-xl">Slutt Uke</span>
                      </div>
                      <input
                        type="week"
                        value={subFieldGroup.endWeek}
                        className={`input input-bordered ${
                          weekStringToDate(subFieldGroup.endWeek) <
                          weekStringToDate(subFieldGroup.startWeek)
                            ? "input-error"
                            : ""
                        }`}
                        onChange={(e) => {
                          const newFieldGroups = { ...fieldGroups };
                          newFieldGroups[groupId].subFieldGroups[
                            index
                          ].endWeek = e.target.value;
                          setFieldGroups(newFieldGroups);
                        }}
                        required
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="btn" onClick={addGroup}>
          Legg til praksisfelt
        </button>

        <div className="w-3/4 ">
          <div className="label">
            <span className="label-text text-xl">Kommentar</span>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea textarea-bordered h-32 w-full"
            aria-label="Kommentarfelt"
          />
        </div>
        <div className="flex flex-row"></div>
        <div className="flex w-full justify-center p-10 gap-5">
          <button
            type="button"
            className="btn w-20"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary w-20">
            Send
          </button>
        </div>
      </div>
    </form>
  );
}
