"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Dropdown from "@/app/_components/Dropdowns/Dropdown";
import {
  fetchInternhipFields,
  addInternshipField,
  fetchStudyPrograms,
  sendOrder,
} from "./actions";
import Link from "next/link";
/**
 * Creates a page to place an order for internships.
 * Should only be accessible for coordinators.
 * @returns A page to place an order for internships.
 */
export default function Page() {
  const router = useRouter();

  const [studyProgramID, setStudyProgramID] = useState<number>();
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [studentsAboveZero, setStudentsAboveZero] = useState({});

  const initialSubFieldGroups = [
    {
      studyYear: 1,
      numStudents: 0,
      startWeek: null,
      endWeek: null,
    },
    {
      studyYear: 2,
      numStudents: 0,
      startWeek: null,
      endWeek: null,
    },
    {
      studyYear: 3,
      numStudents: 0,
      startWeek: null,
      endWeek: null,
    },
  ];
  const [fieldGroups, setFieldGroups] = useState([
    {
      internshipField: "",
      subFieldGroups: initialSubFieldGroups,
    },
  ]);

  const [studyPrograms, setStudyPrograms] = useState<StudyProgram[]>([]);

  // Initialize internshipFields as an array of InternshipField
  const [internshipFields, setInternshipFields] = useState<InternshipField[]>(
    []
  );
  const [newType, setNewType] = useState("");

  // Add a new type for InternshipField
  type InternshipField = {
    name: string;
  };

  type StudyProgram = {
    id: number;
    name: string;
  };

  useEffect(() => {
    fetchStudyPrograms()
      .then((data) => {
        setStudyPrograms(data);
      })
      .catch((error) => console.error("Failed to fetch Study Programs", error));

    fetchInternhipFields()
      .then((data) => {
        setInternshipFields(data);
      })
      .catch((error) =>
        console.error("Failed to fetch internship field", error)
      );
  }, []);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (
      !fieldGroups.some((fieldGroup) => fieldGroup.internshipField) ||
      !studyProgramID
    ) {
      return;
    }
    // Gather form data
    const formData = {
      studyProgramID: studyProgramID,
      comment,
      fieldGroups,
    };

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

  /**
   * Refreshes the page.
   */
  function refreshPage() {
    window.location.reload();
  }

  return (
    <div>
      <dialog
        open={isModalVisible}
        className="modal  modal-bottom sm:modal-middle"
      >
        <div className="bg-base-300 text-base-content modal-box">
          <h3 className="font-bold text-lg">Success!</h3>
          <p className="py-4">Your order has been placed successfully.</p>
          <div className="modal-action">
            <Link href="/" className="btn  rounded-btn h-full">
              Home
            </Link>
            <button
              onClick={refreshPage}
              className="btn btn-accent rounded-btn h-full"
            >
              Send another order
            </button>
          </div>
        </div>
      </dialog>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center w-full h-full gap-5">
          <h1 className="flex justify-center text-4xl font-bold">
            Behov for praksisplasser
          </h1>

          <div>
            <span className="label-text text-xl">Studieprogram</span>
          </div>
          <div className="flex flex-row gap-2">
            <Dropdown
              dropdownName="studieprogram"
              options={studyPrograms}
              selectedOption={
                studyPrograms.find(
                  (studyProgram) => studyProgram.id === studyProgramID
                ) || null
              }
              setSelectedOption={(studyProgram) => {
                setStudyProgramID(studyProgram.id as number);
              }}
              onSearchChange={() => {
                setStudyProgramID(null);
              }}
              renderOption={(studyProgram) => <div>{studyProgram.name}</div>}
              customClassName={` ${isSubmitted && studyProgramID === null ? "input-error" : ""}`}
            />
            <button type="button">
              <a href={`/studyprograms/add`} className="btn btn-primary">
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
                  className="group relative justify-centers rounded-2xl bg-neutral text-neutral-content p-2 md:p-5"
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
                    renderOption={(type) => <div>{type.name}</div>}
                    customClassName={` ${isSubmitted && fieldGroups[groupId].internshipField === "" ? "input-error" : ""}`}
                  />
                  <div className="flex flex-row mt-2 gap-2">
                    <input
                      type="text"
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      placeholder="Legg til nytt praksisfelt"
                      className="input input-bordered text-base-content w-full"
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
                  <div className="flex flex-row flex-wrap gap-5 justify-center mt-2">
                    {group.subFieldGroups.map((subFieldGroup, groupIndex) => (
                      <div key={groupIndex}>
                        <div className="label  w-full">
                          <span className="label-text text-xl">
                            {subFieldGroup.studyYear}. år studenter
                          </span>
                        </div>

                        <div className="form-control w-full">
                          <label className="label" htmlFor="numStudents">
                            <span className="label-text text-xl">
                              Antall Studenter
                            </span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            placeholder="0"
                            aria-label="Antall studenter"
                            onChange={(e) => {
                              const newFieldGroups = [...fieldGroups];
                              newFieldGroups[groupId].subFieldGroups[
                                groupIndex
                              ].numStudents = e.target.value;
                              setFieldGroups(newFieldGroups);

                              // Set studentsAboveZero for this groupId
                              setStudentsAboveZero({
                                ...studentsAboveZero,
                                [`${groupId}_${groupIndex}`]:
                                  Number(e.target.value) > 0,
                              });
                            }}
                            className="input input-bordered text-base-content"
                          />
                        </div>

                        <div className="form-control w-full">
                          <label className="label" htmlFor="startDate">
                            <span className="label-text text-xl">
                              Start Dato
                            </span>
                          </label>
                          <input
                            aria-label="Start dato"
                            type="date"
                            value={
                              subFieldGroup.startWeek
                                ?.toISOString()
                                .split("T")[0]
                            }
                            className={`input input-bordered text-base-content`}
                            onChange={(e) => {
                              const newFieldGroups = [...fieldGroups];
                              const dateValue = Date.parse(e.target.value);
                              if (!isNaN(dateValue)) {
                                newFieldGroups[groupId].subFieldGroups[
                                  groupIndex
                                ].startWeek = new Date(dateValue);
                                setFieldGroups(newFieldGroups);
                              }
                            }}
                            required={
                              studentsAboveZero[`${groupId}_${groupIndex}`]
                            }
                          />
                        </div>
                        <div className="form-control w-full">
                          <label className="label" htmlFor="endDate">
                            <span className="label-text text-xl">
                              Slutt Dato
                            </span>
                          </label>
                          <input
                            aria-label="Slutt Dato"
                            type="date"
                            value={
                              subFieldGroup.endWeek?.toISOString().split("T")[0]
                            }
                            className={`input input-bordered text-base-content ${
                              subFieldGroup.endWeek < subFieldGroup.startWeek
                                ? "input-error"
                                : ""
                            }`}
                            onChange={(e) => {
                              const newFieldGroups = [...fieldGroups];
                              const dateValue = Date.parse(e.target.value);
                              if (!isNaN(dateValue)) {
                                newFieldGroups[groupId].subFieldGroups[
                                  groupIndex
                                ].endWeek = new Date(dateValue);
                                setFieldGroups(newFieldGroups);
                              }
                            }}
                            required={
                              studentsAboveZero[`${groupId}_${groupIndex}`]
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addGroup}
          >
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
            <button type="submit" className="btn btn-accent w-20">
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
