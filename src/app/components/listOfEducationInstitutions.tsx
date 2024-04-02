/** @format */

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UniversalList from "./UniversalList";
const ListOfEducationInstitutions = () => {
  const [educationInstitutions, setEducationInstitutions] = useState<
    EducationInstitution[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<EducationInstitution[]>([]);
  const headers = { Name: "name" };

  useEffect(() => {
    fetch("/api/educationInstitution").then((res) =>
      res.json().then(setEducationInstitutions)
    );
  }, []);

  type EducationInstitution = {
    name: string;
    id: string;
  };

  return (
    <div className="p-10">
      <main className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
        <UniversalList
          rows={educationInstitutions}
          tableName="Departments"
          headers={headers}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          onRowClick={() => {}}
          onRowButtonClick={(row) => {
            window.location.href = `/admin/administerSections/?department_id=${row.id}`;
          }}
          buttonName={"Details"}
          onAddButtonClick={() => {
            window.location.href = `/admin/administerDepartments/addDepartment`;
          }}
        />
      </main>
      <h1 className="text-3xl font-semibold">List of Education Instituts</h1>
      <table className="table my-5">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>
              <Link href="/" className="btn">
                Add Education Institution
              </Link>
            </th>
          </tr>
        </thead>
        {educationInstitutions.map((educationInstitution, index) => (
          <tbody key={index}>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>
                <div className="font-bold">{educationInstitution?.name}</div>
              </th>
              <td>none</td>
              <td>{educationInstitution?.id}</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default ListOfEducationInstitutions;
