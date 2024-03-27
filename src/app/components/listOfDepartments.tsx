/** @format */

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const ListOfDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    fetch("/api/departments").then((res) => res.json().then(setDepartments));
  }, []);

  type Department = {
    name: string;
    id: string;
    employee_id: string;
    employee_email: string;
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold">List of Departments</h1>
      <table className="table my-5">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Leader Email</th>
            <th>
              <a
                href={`/admin/administerDepartments/addDepartment`}
                className="btn btn-xs"
              >
                Add Department
              </a>
            </th>
          </tr>
        </thead>
        {departments.map((department, index) => (
          <tbody key={index}>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>
                <div className="font-bold">{department?.name}</div>
              </th>
              <th>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => {
                    window.location.href = `/profile/?id=${department.employee_id}`;
                  }}
                >
                  {department?.employee_email}
                </button>
              </th>
              <th>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => {
                    window.location.href = `/admin/administerSections/?department_id=${department.id}`;
                  }}
                >
                  details
                </button>
              </th>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default ListOfDepartments;
