/** @format */
/** @format */

"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import DynamicTable from "@/app/components/DynamicTable";

const ListOfStudies = () => {
  const [studies, setStudies] = useState<Study[]>([]);
  const [selectedRows, setSelectedRows] = useState<Study[]>([]);
  const headers = { Name: "name", Employee: "employee.email", id: "id" };
  const [sortedBy, setSortedBy] = useState<string>("name");

  type Study = {
    name: string;
    id: string;
    employee: {
      email: string;
    };
  };
  useEffect(() => {
    fetch(`/api/studyPrograms?sort=${sortedBy}`) // Adjusted the fetch URL to include sorting.
      .then((res) => res.json())
      .then((data) => {
        const modifiedData = data.map((study: Study) => ({
          name: study.name,
          id: study.id,
        }));
        setStudies(modifiedData);
      }) // Ensure proper data handling.
      .catch((error) => console.error("Failed to fetch studies", error)); // Error handling.
  }, [sortedBy]); // Added sortedBy to the dependency array.

  return (
    <main className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        rows={studies}
        tableName={"Study Program"}
        headers={headers}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/studyProgram?id=${row.id}`;
        }}
        buttonName={"Details"}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        onAddButtonClick={() => {
          window.location.href = `/studyPrograms/add`;
        }}
        setSortedBy={setSortedBy}
        url="/api/studyPrograms/"
        setRows={setStudies}
      />
    </main>
  );
};

export default ListOfStudies;
