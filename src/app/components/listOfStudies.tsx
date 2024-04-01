/** @format */
/** @format */

"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import UniversalList from "./UniversalList";

const ListOfStudies = () => {
  const [studies, setStudies] = useState<Study[]>([]);
  const [selectedRows, setSelectedRows] = useState<Study[]>([]);
  const headers = { Name: "name" };

  type Study = {
    name: string;
  };

  useEffect(() => {
    fetch(`/api/studyPrograms`) // Adjusted the fetch URL to match backend routing.
      .then((res) => res.json())
      .then((data) => setStudies(data)) // Ensure proper data handling.
      .catch((error) => console.error("Failed to fetch studies", error)); // Error handling.
  }, []);
  return (
    <main className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <UniversalList
        rows={studies}
        tableName={"studyprogram"}
        headers={headers}
        onRowClick={() => {
          console.log("Row clicked");
        }}
        onRowButtonClick={(row) => {
          window.location.href = `/studyProgram?id=${row.id}`;
        }}
        buttonName={"Details"}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        onAddButtonClick={() => {
          window.location.href = `/admin/administerStudyPrograms`;
        }}
      />
    </main>
  );
};

export default ListOfStudies;
