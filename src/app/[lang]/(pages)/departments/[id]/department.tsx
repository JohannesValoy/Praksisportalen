/** @format */

"use client";

import { useEffect, useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteSection, paginateSections } from "../../sections/action";
import { editDepartmentDetails } from "./action";
import { fetchEmployees } from "../add/action";
import Dropdown from "@/app/components/Dropdown";
import { Department } from "@/app/_models/Department";

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
      employee_id?: string;
    } = {};

    if (updateEmployeeID) {
      update.employee_id = updateEmployeeID;
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

  return (
    <>
      {department ? (
        <>
          <div className="flex flex-col items-center">
            <div className="flex flex-row">
              <h1>Department: {department.name}</h1>
              {user.role === "admin" && (
                <button
                  className="btn btn-sm"
                  onClick={() => setShowModal(true)}
                >
                  edit
                </button>
              )}
              <dialog open={showModal === true} className="modal">
                <div className="modal-box">
                  <div className="flex flex-row justify-between w-full">
                    <h2 className="font-bold text-lg">
                      Edit {department.name}
                    </h2>
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
                            customSubClassName="h-20"
                            renderOption={(user) => (
                              <>
                                <div>{user.name}</div>
                                <div>{user.email}</div>
                              </>
                            )}
                          />
                        </div>

                        <div className="flex flex-row justify-end w-full">
                          <button
                            type="submit"
                            className="btn btn-accent"
                            disabled={!name && !employeeID}
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
            <p>Leader name: {department.employee.name}</p>
            <p>Leader email: {department.employee.email}</p>
            <p>Created At: {department.created_at.toLocaleDateString()}</p>
            <p>Updated At: {department.updated_at.toLocaleDateString()}</p>
          </div>
          <DynamicTable
            tableName={"sections"}
            headers={{
              Name: "name",
              "Section Type": "section_type",
              "Leader Email": "email",
              "Created At": "created_at",
              "Updated At": "updated_at",
            }}
            filter={{ department_id: department.id.toString() }}
            onRowClick={() => {}}
            onRowButtonClick={(row) => {
              window.location.href = `/sections/${row.id}`;
            }}
            buttonName={"Details"}
            readonly={user.role !== "admin"}
            deleteFunction={deleteSection}
            onAddButtonClick={() => {
              window.location.href = `/sections/add`;
            }}
            paginateFunction={paginateSections}
          />
        </>
      ) : (
        <p>Loading Profile details...</p>
      )}
    </>
  );
}
