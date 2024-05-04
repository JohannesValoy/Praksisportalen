"use client";

import { useEffect, useState } from "react";
import { editSectionDetails } from "./action";
import { fetchEmployees, fetchSectionTypes } from "../add/action";
import Dropdown from "@/app/components/Dropdowns/Dropdown";
import { Section } from "@/app/_models/Section";
import AddInternship from "../../../../components/Modals/AddInternshipModal";
import EmployeeDropdown from "@/app/components/Dropdowns/EmployeeDropdown";
import EditModal from "@/app/components/Modals/EditModal";
import InternshipTable from "@/app/components/DynamicTables/InternshipTable";

/**
 * The SectionPage component displays the details of a section.
 * @param section The section object.
 * @param user The user object.
 * @param wordbook The wordbook object containing all the translations.
 * @returns The SectionPage component.
 */
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

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
          console.error("Failed to fetch Section Types", error),
        );
    }
  }, [section]);

  /**
   * The handleSubmit function updates the section details.
   * @param e The event object.
   * The update object contains the updated section details.
   * If the name, section type, or employee ID is not provided, the value is not updated.
   * If the value is provided, the value is updated.
   * The updated section details are then sent to the editSectionDetails function.
   * The refreashPage function is called to reload the page.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateName = name.trim();
    const updateSectionType = sectionType.trim();
    const updateEmployeeID = employeeID.trim();

    const update: {
      name?: string;
      sectionType?: string;
      employeeID?: string;
    } = {};

    if (updateEmployeeID) {
      update.employeeID = updateEmployeeID;
    }
    if (updateName) {
      update.name = updateName;
    }
    if (updateSectionType) {
      update.sectionType = updateSectionType;
    }

    await editSectionDetails(section.id, update);

    refreashPage();
  };

  /**
   * The refreashPage function reloads the page.
   * @returns The reloaded page.
   */
  const refreashPage = () => {
    window.location.reload();
  };

  /**
   * The closeAddModal function closes an add modal and triggers a refresh by updating the refresh key.
   */
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-start">
          <h1>Section: {section.name}</h1>
          <button onClick={() => setShowModal(true)} aria-label="Edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <dialog open={showModal === true} className="modal">
            <div className="modal-box">
              <div className="flex flex-row justify-between w-full">
                <h2 className="font-bold text-lg">Edit</h2>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="btn btn-error btn-sm btn-circle"
                >
                  x
                </button>
              </div>
              <h3 className="text-xl"> {section.name}</h3>

              <EditModal
                setName={setName}
                handleSubmit={handleSubmit}
                disabled={!name && !employeeID && !sectionType}
              >
                <div className="w-full">
                  <div className="label">
                    <span className="label-text">Leader</span>
                  </div>
                  <EmployeeDropdown
                    employees={employees}
                    employeeID={employeeID}
                    setEmployeeID={setEmployeeID}
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
                      sectionTypes.find((type) => type.name === sectionType) ||
                      null
                    }
                    setSelectedOption={(type) => setSectionType(type.name)}
                    onSearchChange={() => setSectionType(null)}
                    renderOption={(type) => <>{type.name}</>}
                    customSubClassName="h-20"
                  />
                </div>
              </EditModal>
            </div>
          </dialog>
        </div>
        <p>{section?.sectionType}</p>
        <p>Leader name: {section.employee?.name}</p>
        <p>Leader email: {section.employee?.email}</p>
        <p>Created At: {section.createdAt.toLocaleDateString()}</p>
        <p>Updated At: {section.updatedAt.toLocaleDateString()}</p>
      </div>
      <>
        {isAddModalOpen && (
          <AddInternship openModal={isAddModalOpen} onClose={closeAddModal} />
        )}
        <InternshipTable
          refreshKey={refreshKey}
          filter={{ departmentID: section.id.toString() }}
          onAddButtonClick={() => {
            setIsAddModalOpen(true);
          }}
        />
      </>
    </>
  );
}