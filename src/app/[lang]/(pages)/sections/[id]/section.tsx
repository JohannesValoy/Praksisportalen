"use client";

import { useState } from "react";
import { editSectionDetails } from "./action";
import Dropdown from "@/app/_components/Dropdowns/Dropdown";
import { Section } from "@/app/_models/Section";
import AddInternship from "../../../../_components/Modals/AddInternshipModal";
import EmployeeDropdown from "@/app/_components/Dropdowns/EmployeeDropdown";
import EditModal from "@/app/_components/Modals/EditModal";
import InternshipTable from "@/app/_components/DynamicTables/InternshipTable";
import { PencilIcon } from "@heroicons/react/24/outline";
import SectionGantt from "./GanttSection";

type Props = {
  section: Section;
  user: { id: string; role?: string };
  wordbook: { [key: string]: string };
  employees: any;
  sectionTypes: any;
};

/**
 * The SectionPage component displays the details of a section.
 * @param root The root object.
 * @param root.section The section object.
 * @param root.user The user object.
 * @param root.wordbook The wordbook object containing all the translations.
 * @param root.employees The employees object.
 * @param root.sectionTypes The section types object.
 * @returns The SectionPage component.
 */
export default function SectionPage({
  section,
  user,
  wordbook,
  employees,
  sectionTypes,
}: Readonly<Props>) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [name, setName] = useState(section.name || "");

  const [sectionType, setSectionType] = useState(section.sectionType || "");

  const [employeeID, setEmployeeID] = useState(section.employeeID || "");

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
            <PencilIcon className="w-6 h-6" />
          </button>
          <dialog open={showModal} className="modal">
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
              <EditModal
                name={section.name}
                setName={setName}
                handleSubmit={handleSubmit}
                disabled={name === section.name && !employeeID && !sectionType}
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
          <AddInternship onClose={closeAddModal} section={section} />
        )}
        <InternshipTable
          refreshKey={refreshKey}
          filter={{ sectionID: section.id.toString() }}
          onAddButtonClick={() => {
            setIsAddModalOpen(true);
          }}
        />
        <SectionGantt sectionID={section.id} />
      </>
    </>
  );
}
