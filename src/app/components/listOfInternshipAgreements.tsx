/** @format */

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UniversalList from "./DynamicTable";
const ListOfInternshipAgreements = () => {
  const [internshipAgreements, setInternshipAgreements] = useState<
    InternshipAgreement[]
  >([]);
  const [sortedBy, setSortedBy] = useState<string>("name");
  const [selectedRows, setSelectedRows] = useState<InternshipAgreement[]>([]);
  const headers = { Name: "name" };
  useEffect(() => {
    fetch("/api/InternshipAgreement").then((res) =>
      res.json().then(setInternshipAgreements)
    );
  }, []);

  type InternshipAgreement = {
    name: string;
    id: string;
  };

  if (sortedBy) {
    internshipAgreements.sort((a, b) => {
      if (a[sortedBy] < b[sortedBy]) {
        return -1;
      }
      if (a[sortedBy] > b[sortedBy]) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <div className="p-10">
      <main className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
        <UniversalList
          rows={internshipAgreements}
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
          sortableBy={["name", "email"]}
          setSortedBy={setSortedBy}
          onDeleteButtonClicked={() => {
            Promise.all(
              selectedRows.map((row) =>
                fetch(`/api/departments/${row.id}`, {
                  method: "DELETE",
                }).then((res) => res.json())
              )
            ).then((results) => {
              const failedDeletes = results.filter((result) => !result.success);
              if (failedDeletes.length > 0) {
                alert(`Failed to delete ${failedDeletes.length} departments`);
              }
              setInternshipAgreements(
                internshipAgreements.filter(
                  (department) =>
                    !failedDeletes.some(
                      (failedDelete) => failedDelete.id === department.id
                    )
                )
              );
            });
          }}
        />
      </main>
      <h1 className="text-3xl font-semibold">List of Internship Agreements</h1>
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
              <Link
                href="/"
                className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                Add Internship Agreement
              </Link>
            </th>
          </tr>
        </thead>
        {internshipAgreements.map((internshipAgreement, index) => (
          <tbody key={index}>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>
                <div className="font-bold">{internshipAgreement?.name}</div>
              </th>
              <td>none</td>
              <td>{internshipAgreement?.id}</td>
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

export default ListOfInternshipAgreements;
