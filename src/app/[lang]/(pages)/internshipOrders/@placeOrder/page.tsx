/** @format */

"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Dropdown from "@/app/components/Dropdown";
import {
  fetchInternhipFields,
  addInternshipField,
  fetchStudyPrograms,
  sendOrder,
} from "./actions";
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  const [studyProgram_id, setStudyProgram_id] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [studentsAboveZero, setStudentsAboveZero] = useState({});

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
  const [fieldGroups, setFieldGroups] = useState([
    {
      internshipField: "",
      subFieldGroups: initialSubFieldGroups,
    },
  ]);

  const addGroup = () => {
    setFieldGroups((prevFieldGroups) => [
      ...prevFieldGroups,
      {
        internshipField: "",
        subFieldGroups: initialSubFieldGroups,
      },
    ]);
  };

  // Delete a field group
  const handleDeleteGroup = (index) => {
    setFieldGroups((prevFieldGroups) => {
      const newFieldGroups = [...prevFieldGroups];
      // Reset the internshipField of the group that replaces the deleted group
      if (newFieldGroups[index + 1]) {
        newFieldGroups[index + 1].internshipField = "";
        newFieldGroups[index + 1].subFieldGroups = [...initialSubFieldGroups];
      }
      newFieldGroups.splice(index, 1);
      return newFieldGroups;
    });
  };

  const [studyPrograms, setStudyPrograms] = useState<StudyProgram[]>([]);
  type StudyProgram = {
    id: string;
    name: string;
  };

  useEffect(() => {
    fetchStudyPrograms()
      .then((data) => {
        setStudyPrograms(data);
      })
      .catch((error) => console.error("Failed to fetch Study Programs", error));
  }, []);

  // Initialize internshipFields as an array of InternshipField
  const [internshipFields, setInternshipFields] = useState<InternshipField[]>(
    []
  );
  const [newType, setNewType] = useState("");

  // Add a new type for InternshipField
  type InternshipField = {
    name: string;
  };

  // Fetch internship field from the API
  useEffect(() => {
    fetchInternhipFields()
      .then((data) => {
        setInternshipFields(data);
      }) // Ensure proper data handling.
      .catch((error) =>
        console.error("Failed to fetch internship field", error)
      ); // Error handling.
  }, []);

  function weekStringToDate(weekString) {
    const [year, week] = weekString.split("-W");
    const date = new Date(year);
    date.setDate(date.getDate() + (week - 1) * 7);
    return date;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (
      fieldGroups.some((fieldGroup) => fieldGroup.internshipField === "") ||
      studyProgram_id === ""
    ) {
      return;
    }

    // Gather form data
    const formData = {
      studyProgram_id,
      comment,
      fieldGroups,
    };

    console.log(formData);
    try {
      await sendOrder(formData);

      setIsModalVisible(true);
    } catch (error) {
      return {
        status: error.response?.status || 500,
        statusText: error.response?.statusText || "Server Error",
      };
    }
  };

  function refreshPage() {
    window.location.reload();
  }

  const handleAddType = async () => {
    if (
      newType.trim() === "" ||
      internshipFields.some((field) => field.name === newType)
    ) {
      return;
    }
    addInternshipField(newType); // Add the new type to the database

    fetchInternhipFields().then((data) => {
      setInternshipFields(data);
    }); // Fetch the updated list of types
    setNewType(""); // Clear the input field
  };

  return (
    <div>
      <dialog
        id="my_modal_5"
        open={isModalVisible}
        className="modal  modal-bottom sm:modal-middle"
      >
        <div className="bg-base-300 modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Success! Your order has been placed successfully.
          </p>
          <div className="modal-action">
            <Link href="/" className="btn  rounded-btn h-full">
              Home
            </Link>
            <button onClick={refreshPage} className="btn  rounded-btn h-full">
              Send another order
            </button>
          </div>
        </div>
      </dialog>
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
                  (studyProgram) => studyProgram.id === studyProgram_id
                ) || null
              }
              setSelectedOption={(studyProgram) => {
                setStudyProgram_id(studyProgram.id);
              }}
              onSearchChange={() => {
                setStudyProgram_id("");
              }}
              renderOption={(studyProgram) => (
                <>
                  <div className="mask mask-squircle w-12 h-12 overflow-hidden"></div>

                  <div>{studyProgram.name}</div>
                </>
              )}
              customClassName={` ${isSubmitted && studyProgram_id === "" ? "input-error" : ""}`}
            />
            <button type="button">
              <a href={`/studyprograms/add`} className="btn btn-secondary">
                Nytt studieprogram
              </a>
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(fieldGroups).map(([groupId, group]) => {
              const numericGroupId = Number(groupId);

              return (
                <div
                  key={groupId}
                  className="group relative justify-centers rounded-3xl bg-base-200 mb-2 p-8"
                >
                  <div className="flex flex-row items-center">
                    <div className=" w-full">
                      <span className="label-text text-2xl">Praksisfelt</span>
                    </div>
                    {Number(groupId) !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteGroup(groupId)}
                        className="btn btn-error rounded-full m-2"
                      >
                        X
                      </button>
                    )}
                  </div>
                  <Dropdown
                    key={groupId}
                    dropdownName="Praksisfelt"
                    options={internshipFields}
                    selectedOption={
                      internshipFields.find(
                        (type) => type.name === group.internshipField
                      ) || null
                    }
                    setSelectedOption={(type) => {
                      const newFieldGroups = [...fieldGroups];
                      newFieldGroups[numericGroupId].internshipField =
                        type.name;
                      setFieldGroups(newFieldGroups);
                    }}
                    onSearchChange={() => {
                      const newFieldGroups = [...fieldGroups];
                      newFieldGroups[numericGroupId].internshipField = "";
                      setFieldGroups(newFieldGroups);
                    }}
                    renderOption={(type) => (
                      <>
                        <div className="mask mask-squircle w-12 h-12 overflow-hidden "></div>

                        <div>{type.name}</div>
                      </>
                    )}
                    customClassName={` ${isSubmitted && fieldGroups[groupId].internshipField === "" ? "input-error" : ""}`}
                  />
                  <div className="flex flex-row mt-2 gap-2">
                    <input
                      type="text"
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      placeholder="Legg til nytt praksisfelt"
                      className="input input-bordered w-full"
                      aria-label="Add new type"
                      maxLength={200}
                    />
                    <button
                      type="button"
                      className="btn btn-secondary h-full"
                      onClick={handleAddType}
                      disabled={
                        newType.trim() === "" ||
                        internshipFields.some((field) => field.name === newType)
                      }
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
                              const newFieldGroups = [...fieldGroups];
                              newFieldGroups[groupId].subFieldGroups[
                                index
                              ].numStudents = e.target.value;
                              setFieldGroups(newFieldGroups);

                              // Set studentsAboveZero for this groupId
                              setStudentsAboveZero({
                                ...studentsAboveZero,
                                [`${groupId}_${index}`]:
                                  Number(e.target.value) > 0,
                              });
                            }}
                            className="input input-bordered"
                          />
                        </label>

                        <label className="form-control w-full">
                          <div className="label">
                            <span className="label-text text-xl">
                              Start Uke
                            </span>
                          </div>
                          <input
                            type="week"
                            value={subFieldGroup.startWeek}
                            className={`input input-bordered`}
                            onChange={(e) => {
                              const newFieldGroups = [...fieldGroups];
                              newFieldGroups[groupId].subFieldGroups[
                                index
                              ].startWeek = e.target.value;
                              setFieldGroups(newFieldGroups);
                            }}
                            required={studentsAboveZero[`${groupId}_${index}`]}
                          />
                        </label>

                        <label className="form-control w-full">
                          <div className="label">
                            <span className="label-text text-xl">
                              Slutt Uke
                            </span>
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
                              const newFieldGroups = [...fieldGroups];
                              newFieldGroups[groupId].subFieldGroups[
                                index
                              ].endWeek = e.target.value;
                              setFieldGroups(newFieldGroups);
                            }}
                            required={studentsAboveZero[`${groupId}_${index}`]}
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
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
              maxLength={65000}
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
    </div>
  );
}
