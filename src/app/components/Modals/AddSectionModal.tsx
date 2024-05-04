"use client";

import { useState, useEffect } from "react";
import Dropdown from "@/app/components/Dropdowns/Dropdown";
import ContainerBox from "@/app/components/ContainerBox";
import {
  createSection,
  createSectionType,
  fetchDepartments,
  fetchEmployees,
  fetchSectionTypes,
  fetchSectionNames,
} from "../../[lang]/(pages)/sections/add/action";
import AddDepartment from "./AddDepartmentModal";
import AddEmployee from "./AddLeaderModal";
import EmployeeDropdown from "../Dropdowns/EmployeeDropdown";

type Props = {
  openModal: boolean;
  onClose: () => void;
};

/**
 * The AddSection component displays a form to add a section.
 * @param root The root object.
 * @param root.openModal The openModal flag.
 * @param root.onClose The onClose function.
 * @returns A form to add a section.
 */
export default function AddSection({ openModal, onClose }: Readonly<Props>) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isTypeDisabled, setIsTypeDisabled] = useState(true);
  const [openDepartmentModal, setOpenDepartmentModal] = useState(false);
  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [departments, setDepartments] = useState([]);
  const [departmentID, setDepartmentID] = useState(null);

  const [sections, setSections] = useState([]);
  const [name, setName] = useState("");

  const [sectionTypes, setSectionTypes] = useState([]);
  const [sectionType, setSectionType] = useState(null);
  const [newType, setNewType] = useState("");

  const [employees, setEmployees] = useState([]);
  const [employeeID, setEmployeeID] = useState(null);

  useEffect(() => {
    if (
      name.trim() === "" ||
      sections.some((section) => section.name === name.trim()) ||
      departmentID === null ||
      sectionType === null
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [name, sections, departmentID, sectionType]);

  useEffect(() => {
    if (newType.trim() === "") {
      setIsTypeDisabled(true);
    } else {
      setIsTypeDisabled(false);
    }
  }, [newType]);

  useEffect(() => {
    fetchDepartments()
      .then((data) => {
        setDepartments(data);
      })
      .catch((error) => console.error("Failed to fetch Departments", error));

    fetchSectionNames()
      .then((data) => {
        setSections(data);
      })
      .catch((error) => console.error("Failed to fetch Sections", error));

    fetchEmployees()
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => console.error("Failed to fetch Employees", error));

    fetchSectionTypes()
      .then((data) => {
        setSectionTypes(data);
      })
      .catch((error) => console.error("Failed to fetch Section Types", error));
  }, [refreshKey]);

  /**
   * The handleAddType function adds a new section type.
   * @returns A new section type.
   */
  const handleAddType = async () => {
    await createSectionType({ name: newType });
    setSectionTypes([...sectionTypes, { name: newType }]);
    setSectionType(newType);
    setNewType("");
  };

  /**
   * The handleSubmit function adds a new section.
   * @param event The event object.
   * @returns A new section.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: name.trim(),
      departmentID,
      employeeID,
      sectionType,
    };

    await createSection(data);
    onClose();
  };

  /**
   * The closeDepartmentModal function closes the add department modal.
   */
  const closeDepartmentModal = () => {
    setOpenDepartmentModal(false);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  /**
   * The closeEmployeeModal function closes the add employee modal.
   */
  const closeEmployeeModal = () => {
    setOpenEmployeeModal(false);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" />
      <dialog
        open={openModal === true}
        className="modal modal-bottom sm:modal-middle"
      >
        {openDepartmentModal && (
          <AddDepartment
            openModal={openDepartmentModal}
            onClose={closeDepartmentModal}
          />
        )}
        {openEmployeeModal && (
          <AddEmployee
            openModal={openEmployeeModal}
            onClose={closeEmployeeModal}
          />
        )}
        <div className="flex flex-col justify-center items-center h-fit w-full">
          <ContainerBox className="items-center">
            <form
              className="flex flex-col gap-5 p-4 w-full justify-center"
              onSubmit={handleSubmit}
            >
              <h1 className="flex justify-center text-4xl font-bold">
                Add Section
              </h1>

              <input
                type="text"
                placeholder="Section Name"
                className="input input-bordered text-base-content"
                onChange={(e) => setName(e.target.value)}
                value={name}
                maxLength={255}
                aria-label="Set section Name"
                required
              />
              <div>
                <p>Department</p>
                <div className="flex flex-row mb-2 ">
                  <Dropdown
                    dropdownName="Choose department"
                    options={departments}
                    selectedOption={
                      departments.find((dp) => dp.id === departmentID) || null
                    }
                    setSelectedOption={(dp) => setDepartmentID(dp.id)}
                    onSearchChange={() => setDepartmentID(null)}
                    renderOption={(department) => <>{department.name}</>}
                  />
                  <button
                    type="button"
                    className="btn btn-primary "
                    onClick={() => {
                      setOpenDepartmentModal(true);
                    }}
                  >
                    Add Department
                  </button>
                </div>
              </div>
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
                      setOpenEmployeeModal(true);
                    }}
                  >
                    Add Employee
                  </button>
                </div>
              </div>
              <div>
                <p>Section Type</p>
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
                />
                <div className="flex flex-row mt-2">
                  <input
                    type="text"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    placeholder="New section type"
                    className="input input-bordered w-full text-base-content"
                  />
                  <button
                    type="button"
                    className="btn btn-secondary h-full"
                    onClick={handleAddType}
                    disabled={isTypeDisabled}
                  >
                    Add new type
                  </button>
                </div>
              </div>

              <div className="flex flex-row gap-5 justify-between">
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
