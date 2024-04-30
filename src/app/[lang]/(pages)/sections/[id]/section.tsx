/** @format */

"use client";

import { useEffect, useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { editSectionDetails } from "./action";
import {
  deleteInternship,
  paginateInternships,
} from "../../internships/action";
import { fetchEmployees, fetchSectionTypes } from "../add/action";
import Dropdown from "@/app/components/Dropdown";
import { Section } from "@/app/_models/Section";

export default function SectionPage({
  section,
  user,
  wordbook,
}: {
  readonly section: Section;
  readonly user: { readonly id: string; readonly role?: string };
  readonly wordbook: { readonly [key: string]: string };
}) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [sectionTypes, setSectionTypes] = useState([]);
  const [sectionType, setSectionType] = useState("");

  const [employees, setEmployees] = useState([]);
  const [employeeID, setEmployeeID] = useState("");

  useEffect(() => {
    if (section.id !== null) {
      fetchEmployees()
        .then((data) => {
          setEmployees(data);
        })
        .catch((error) => console.error("Failed to fetch Employees", error));

      fetchSectionTypes()
        .then((data) => {
          setSectionTypes(data);
        })
        .catch((error) =>
          console.error("Failed to fetch Section Types", error)
        );
    }
  }, [section]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateName = name.trim();
    const updateSectionType = sectionType.trim();
    const updateEmployeeID = employeeID.trim();

    // Declare the type of the update object
    const update: {
      name?: string;
      section_type?: string;
      employee_id?: string;
    } = {};

    if (updateEmployeeID) {
      update.employee_id = updateEmployeeID;
    }
    if (updateName) {
      update.name = updateName;
    }
    if (updateSectionType) {
      update.section_type = updateSectionType;
    }

    await editSectionDetails(section.id, update);

    refreashPage();
  };

  const refreashPage = () => {
    window.location.reload();
  };

  return (
    <>
      {section ? (
        <>
          <div className="flex flex-col items-center">
            <div className="flex flex-row">
              <h1>Section: {section.name}</h1>
              <button className="btn btn-sm" onClick={() => setShowModal(true)}>
                edit
              </button>
              <dialog open={showModal === true} className="modal">
                <div className="modal-box">
                  <div className="flex flex-row justify-between w-full">
                    <h2 className="font-bold text-lg">Edit {section.name}</h2>
                    <button
                      onClick={() => setShowModal(false)}
                      type="button"
                      className="btn btn-error btn-sm btn-circle"
                    >
                      x
                    </button>
                  </div>

                  <div className="modal-action">
                    <form
                      className="w-full"
                      method="dialog"
                      onSubmit={handleSubmit}
                    >
                      <div className="flex flex-col items-center w-full gap-6">
                        <label className="form-control w-full ">
                          <div className="label">
                            <span className="label-text">Name</span>
                          </div>
                          <input
                            type="name"
                            placeholder="name"
                            className="input input-bordered "
                            onChange={(e) => setName(e.target.value.trim())}
                            maxLength={255}
                            aria-label="Set first name"
                          />
                        </label>

                        <div className="w-full">
                          <div className="label">
                            <span className="label-text">Leader</span>
                          </div>
                          <Dropdown
                            dropdownName="Leader"
                            options={employees}
                            selectedOption={
                              employees.find(
                                (user) => user.id === employeeID
                              ) || null
                            }
                            setSelectedOption={(user) =>
                              setEmployeeID(user.id as string)
                            }
                            onSearchChange={() => setEmployeeID(null)}
                            customSubClassName="h-30"
                            renderOption={(user) => (
                              <>
                                <div>{user.name}</div>
                                <div>{user.email}</div>
                              </>
                            )}
                          />
                        </div>

                        <div className="w-full">
                          <div className="label">
                            <span className="label-text">Section Type</span>
                          </div>
                          <Dropdown
                            dropdownName="Choose section Type"
                            options={sectionTypes}
                            selectedOption={
                              sectionTypes.find(
                                (type) => type.name === sectionType
                              ) || null
                            }
                            setSelectedOption={(type) =>
                              setSectionType(type.name)
                            }
                            onSearchChange={() => setSectionType(null)}
                            renderOption={(type) => <>{type.name}</>}
                            customSubClassName="h-20"
                          />
                        </div>

                        <div className="flex flex-row justify-end w-full">
                          <button
                            type="submit"
                            className="btn btn-accent"
                            disabled={!name && !sectionType && !employeeID}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
            <p>{section.section_type}</p>
            <p>Leader name: {section.employee.name}</p>
            <p>Leader email: {section.employee.email}</p>
            <p>Created At: {section.created_at.toLocaleDateString()}</p>
            <p>Updated At: {section.updated_at.toLocaleDateString()}</p>
          </div>
          <DynamicTable
            tableName={"internships"}
            headers={{
              Name: "name",
              "Internship Field": "internshipField",
              "Max Capacity": "maxCapacity",
              "Current Capacity": "currentCapacity",
              "Number of Beds": "numberOfBeds",
              "Created At": "created_at",
              "Updated At": "updated_at",
            }}
            filter={{ department_id: section.id.toString() }}
            onRowClick={() => {}}
            onRowButtonClick={(row) => {
              window.location.href = `/internships/${row.id}`;
            }}
            buttonName={"Details"}
            readonly={user.role !== "admin"}
            deleteFunction={deleteInternship}
            onAddButtonClick={() => {
              window.location.href = `/internships/add`;
            }}
            paginateFunction={paginateInternships}
          />
        </>
      ) : (
        <p>Loading Profile details...</p>
      )}
    </>
  );
}
