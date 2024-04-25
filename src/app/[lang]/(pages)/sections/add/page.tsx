/** @format */

"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Dropdown from "@/app/components/Dropdown";
import ContainerBox from "@/app/components/ContainerBox";
import SuccessDialog from "@/app/components/SuccessDialog";
import {
  createSection,
  createSectionType,
  fetchDepartments,
  fetchEmployees,
  fetchSectionTypes,
  fetchSections,
} from "./action";

export default function Page() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isTypeDisabled, setIsTypeDisabled] = useState(true);

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

    fetchSections()
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
  }, []);

  const handleAddType = async () => {
    await createSectionType({ name: newType });
    setSectionTypes([...sectionTypes, { name: newType }]);
    setSectionType(newType);
    setNewType("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: name.trim(),
      departmentID,
      employeeID,
      sectionType,
    };

    await createSection(data);

    setIsModalVisible(true);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <SuccessDialog isModalVisible={isModalVisible} />
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
            className="input input-bordered"
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
                renderOption={(department) => (
                  <>
                    <th>
                      <div className="  w-full h-12 overflow-hidden"></div>
                    </th>
                    <td>{department.name}</td>
                  </>
                )}
              />
              <button type="button" className="btn btn-primary ">
                Add Department
              </button>
            </div>
          </div>
          <div>
            <p>Optional</p>
            <div className="flex flex-row mb-2">
              <Dropdown
                dropdownName="Leader"
                options={employees}
                selectedOption={
                  employees.find((user) => user.id === employeeID) || null
                }
                setSelectedOption={(user) => setEmployeeID(user.id as string)}
                onSearchChange={() => setEmployeeID(null)}
                renderOption={(user) => (
                  <>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                  </>
                )}
              />
              <button type="button" className="btn btn-primary h-full">
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
                sectionTypes.find((type) => type.name === sectionType) || null
              }
              setSelectedOption={(type) => setSectionType(type.name)}
              onSearchChange={() => setSectionType(null)}
              renderOption={(type) => (
                <>
                  <th>
                    <div className=" w-12 h-12 overflow-hidden "></div>
                  </th>
                  <td>{type.name}</td>
                </>
              )}
            />
            <div className="flex flex-row mt-2">
              <input
                type="text"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                placeholder="Enter new section type"
                className="input input-bordered w-full"
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

          <div className="flex flex-row gap-5">
            <button
              type="button"
              className="btn w-20"
              onClick={() => router.back()}
            >
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
  );
}
