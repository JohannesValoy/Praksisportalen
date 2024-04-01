/** @format */
/** @format */

"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import UniversalList from "./UniversalList";

const ListOfStudies = () => {
  const [studies, setStudies] = useState<Study[]>([]);
  const [selectedRows, setSelectedRows] = useState<Study[]>([]);
  const headers = { Name: "name", ID: "id" };
  const [sortedBy, setSortedBy] = useState<string>("name");

  type Study = {
    name: string;
    id: string;
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
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/studyProgram?id=${row.id}`;
        }}
        buttonName={"Details"}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        onAddButtonClick={() => {
          window.location.href = `/admin/administerStudyPrograms`;
        }}
        sortableBy={["id", "name", "email"]}
        setSortedBy={setSortedBy}
        onDeleteButtonClicked={() => {
          Promise.all(
            selectedRows.map((row) =>
              fetch(`/api/studyPrograms/${row.id}`, {
                method: "DELETE",
              }).then((res) => res.json())
            )
          ).then((results) => {
            const failedDeletes = results.filter((result) => !result.success);
            if (failedDeletes.length > 0) {
              alert(
                `Failed to delete users with ids ${failedDeletes
                  .map((result) => result.id)
                  .join(", ")}`
              );
            } else {
              setStudies(
                studies.filter(
                  (study) => !selectedRows.find((row) => row.id === study.id)
                )
              );
            }
          });
        }}
      />
    </main>
  );
};

export default ListOfStudies;
