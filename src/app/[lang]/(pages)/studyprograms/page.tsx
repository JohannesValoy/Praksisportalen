/** @format */
/** @format */

"use client";
import React, { useState, useEffect } from "react";
import DynamicTable from "@/app/components/DynamicTable";

const ListOfStudies = () => {
  const [studies, setStudies] = useState<Study[]>([]);
  const [selectedRows, setSelectedRows] = useState<Study[]>([]);
  const headers = { Name: "name", id: "id" };
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
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        rows={studies}
        tableName={"Study Programs"}
        headers={headers}
        onRowClick={() => {}}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        onAddButtonClick={() => {
          window.location.href = `/studyprograms/add`;
        }}
        onRowButtonClick={(row) => {
          window.location.href = `/studyprograms/${row.id}`;
        }}
        buttonName={"Details"}
        setSortedBy={setSortedBy}
        url="/api/studyPrograms/"
        setRows={setStudies}
      />
    </div>
  );
};

export default ListOfStudies;
