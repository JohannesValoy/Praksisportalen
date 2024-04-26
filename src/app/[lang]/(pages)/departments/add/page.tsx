/** @format */

"use client";

import ContainerBox from "@/app/components/ContainerBox";
import Dropdown from "@/app/components/Dropdown";
import SuccessDialog from "@/app/components/SuccessDialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createDepartment, fetchDepartments, fetchEmployees } from "./action";

export default function Page() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeID, setEmployeeID] = useState(null);
  const [name, setName] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  type Employee = {
    name: string;
    id: string;
    email: string;
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
  }, [name]);

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
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: name.trim(),
      employeeID: employeeID,
    };

    createDepartment(data);
    setIsModalVisible(true);
  };

  return (
    <div className="flex flex-col justify-center items-center h-fit w-full">
      <SuccessDialog isModalVisible={isModalVisible} />
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
            className="input input-bordered"
            onChange={(e) => setName(e.target.value)}
            value={name}
            maxLength={255}
            aria-label="Set department Name"
            required
          />
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
              <button>
                <a
                  href={`/admin/addUser?role=${"employee"}`}
                  className="btn btn-primary h-full"
                >
                  Add Employee
                </a>
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
