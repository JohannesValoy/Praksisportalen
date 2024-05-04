"use client";

import ContainerBox from "@/app/components/ContainerBox";
import { useState, useEffect } from "react";
import {
  createDepartment,
  fetchDepartments,
  fetchEmployees,
} from "../../[lang]/(pages)/departments/add/action";
import AddEmployee from "./AddLeaderModal";
import EmployeeDropdown from "../Dropdowns/EmployeeDropdown";

type Props = {
  openModal: boolean;
  onClose: () => void;
};

/**
 * The AddDepartment component displays a form to add a department.
 * @param openModal The openModal flag.
 * @param onClose The onClose function.
 * @returns A form to add a department.
 */
export default function AddDepartment({ openModal, onClose }: Readonly<Props>) {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeID, setEmployeeID] = useState(null);
  const [name, setName] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  type Employee = {
    name: string;
    id?: string;
    email: string;
  };

  /**
   * The closeAddModal function closes the add department modal.
   */
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  useEffect(() => {
    if (
      name.trim() === "" ||
      departments.some((dp) => dp.name === name.trim())
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [name, departments]);

  useEffect(() => {
    fetchDepartments()
      .then((data) => {
        setDepartments(data);
      })
      .catch((error) => console.error("Failed to fetch Departments", error));
  }, []);

  useEffect(() => {
    fetchEmployees()
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => console.error("Failed to fetch Employees", error));
  }, [refreshKey]);

  /**
   * The handleSubmit function adds a new department.
   * @param event The event object.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data: { name: string; employeeID?: string } = {
      name: name.trim(),
    };

    if (employeeID) {
      data.employeeID = employeeID;
    }

    await createDepartment(data);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" />
      <dialog
        open={openModal === true}
        className="modal modal-bottom sm:modal-middle"
      >
        {isAddModalOpen && (
          <AddEmployee openModal={isAddModalOpen} onClose={closeAddModal} />
        )}
        <div className="flex flex-col justify-center items-center h-fit w-full">
          <ContainerBox className="items-center">
            <form
              className="flex flex-col gap-5  items-center justify-center"
              onSubmit={handleSubmit}
            >
              <h1 className="flex justify-center text-4xl font-bold">
                Add Department
              </h1>

              <input
                type="text"
                placeholder="Department Name"
                className="input input-bordered text-base-content"
                onChange={(e) => setName(e.target.value)}
                value={name}
                maxLength={255}
                aria-label="Set department Name"
                required
              />
              <div>
                <p>Optional</p>
                <div className="flex flex-row mb-2">
                  <EmployeeDropdown
                    employees={employees}
                    employeeID={employeeID}
                    setEmployeeID={setEmployeeID}
                  />
                  <button
                    type="button"
                    className="btn btn-primary "
                    onClick={() => {
                      setIsAddModalOpen(true);
                    }}
                  >
                    Add Employee
                  </button>
                </div>
              </div>

              <div className="flex flex-row gap-5 w-full justify-between">
                <button type="button" className="btn w-20" onClick={onClose}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-accent w-20"
                  disabled={isSubmitDisabled}
                >
                  Save
                </button>
              </div>
            </form>
          </ContainerBox>
        </div>
      </dialog>
    </>
  );
}
