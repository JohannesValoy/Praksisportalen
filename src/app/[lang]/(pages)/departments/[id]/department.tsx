"use client";

import { useState } from "react";
import { deleteSection } from "../../sections/action";
import { editDepartmentDetails } from "./action";
import { Department } from "@/app/_models/Department";
import AddSection from "../../../../_components/Modals/AddSectionModal";
import EmployeeDropdown from "@/app/_components/Dropdowns/EmployeeDropdown";
import SectionTable from "@/app/_components/DynamicTables/SectionTable";
import EditModal from "@/app/_components/Modals/EditModal";

type Props = {
  user: { id: string; role?: string };
  wordbook: { [key: string]: string };
  department: Department;
  employees: any;
};

/**
 * The DepartmentPage component displays the details of a department.
 * @param root The root object.
 * @param root.user The user object.
 * @param root.wordbook The wordbook object containing all the translations.
 * @param root.department The department object.
 * @param root.employees The employees object.
 * @returns The DepartmentPage component.
 */
export default function DepartmentPage({
  user,
  wordbook,
  department,
  employees,
}: Readonly<Props>) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [name, setName] = useState("");

  const [employeeID, setEmployeeID] = useState("");

  /**
   * The handleSubmit function updates the department details.
   * @param e The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateName = name.trim();
    const updateEmployeeID = employeeID.trim();

    const update: {
      name?: string;
      employeeID?: string;
    } = {};

    if (updateEmployeeID) {
      update.employeeID = updateEmployeeID;
    }
    if (updateName) {
      update.name = updateName;
    }

    await editDepartmentDetails(department.id, update);

    refreashPage();
  };

  /**
   * The refreashPage function reloads the page.
   * This is used to refresh the page after an update.
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
          <h1>Department: {department.name}</h1>
          {user.role === "admin" && (
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
          )}
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
              <EditModal
                name={department.name}
                setName={setName}
                handleSubmit={handleSubmit}
                disabled={!name && !employeeID}
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
              </EditModal>
            </div>
          </dialog>
        </div>
        <p>Leader name: {department.employee?.name}</p>
        <p>Leader email: {department.employee?.email}</p>
        <p>Created At: {department.createdAt.toLocaleDateString()}</p>
        <p>Updated At: {department.updatedAt.toLocaleDateString()}</p>
      </div>
      <>
        {isAddModalOpen && (
          <AddSection
            openModal={isAddModalOpen}
            onClose={closeAddModal}
            department={department}
          />
        )}
        <SectionTable
          refreshKey={refreshKey}
          filter={{ departmentID: department.id.toString() }}
          readOnly={user.role !== "admin"}
          deleteFunction={deleteSection}
          onAddButtonClick={() => {
            setIsAddModalOpen(true);
          }}
        />
      </>
    </>
  );
}
