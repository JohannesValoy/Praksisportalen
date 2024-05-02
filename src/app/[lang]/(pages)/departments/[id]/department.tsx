/** @format */

"use client";

import { useEffect, useState } from "react";
import { deleteSection } from "../../sections/action";
import { editDepartmentDetails } from "./action";
import { fetchEmployees } from "../add/action";
import { Department } from "@/app/_models/Department";
import AddSection from "../../../../components/Modals/AddSectionModal";
import EmployeeDropdown from "@/app/components/Dropdowns/EmployeeDropdown";
import SectionTable from "@/app/components/DynamicTables/SectionTable";
import EditModal from "@/app/components/Modals/EditModal";

export default function DepartmentPage({
  user,
  wordbook,
  department,
}: {
  readonly user: { readonly id: string; readonly role?: string };
  readonly wordbook: { readonly [key: string]: string };
  readonly department: Department;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [name, setName] = useState("");

  const [employees, setEmployees] = useState([]);
  const [employeeID, setEmployeeID] = useState("");

  useEffect(() => {
    if (department?.id !== null) {
      fetchEmployees()
        .then((data) => {
          setEmployees(data);
        })
        .catch((error) => console.error("Failed to fetch Employees", error));
    }
  }, [department]);

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

  const refreashPage = () => {
    window.location.reload();
  };

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
              <h3 className="text-xl"> {department.name}</h3>
              <EditModal
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
          <AddSection openModal={isAddModalOpen} onClose={closeAddModal} />
        )}
        <SectionTable
          refreshKey={refreshKey}
          headers={{
            Name: "name",
            "Section Type": "sectionType",
            "Leader Email": "email",
            "Created At": "createdAt",
            "Updated At": "updatedAt",
          }}
          filter={{ departmentID: department.id.toString() }}
          readonly={user.role !== "admin"}
          deleteFunction={deleteSection}
          onAddButtonClick={() => {
            setIsAddModalOpen(true);
          }}
        />
      </>
    </>
  );
}
