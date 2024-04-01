/** @format */

"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import UniversalList from "./UniversalList";

const ListOfSections = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("department_id");
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedRows, setSelectedRows] = useState<Section[]>([]);
  const headers = { Name: "name", Email: "employee_email" };
  const [sortedBy, setSortedBy] = useState<string>("name");
  const clickableColumns = {
    employee_email: (row) => {
      window.location.href = `/profile/?id=${row.employee_id}`;
    },
  };

  useEffect(() => {
    if (id !== null) {
      fetch(`/api/sections/${id}`)
        .then((res) => res.json())
        .then((data) => setSections(data));
    } else {
      fetch(`/api/sections`)
        .then((res) => res.json())
        .then(setSections);
    }
  }, [id]);

  type Section = {
    name: string;
    id: string;
    employee_id: string;
    employee_email: string;
  };

  return (
    <main className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <UniversalList
        rows={sections}
        tableName="Sections"
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/admin/administerInternships/?section_id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/admin/administerSections/addSection`;
        }}
        clickableColumns={clickableColumns}
        sortableBy={["name", "email"]}
        setSortedBy={setSortedBy}
        onDeleteButtonClicked={() => {
          Promise.all(
            selectedRows.map((row) =>
              fetch(`/api/sections/${row.id}`, {
                method: "DELETE",
              }).then((res) => res.json())
            )
          ).then((results) => {
            const failedDeletes = results.filter((result) => !result.success);
            if (failedDeletes.length > 0) {
              alert(
                `Failed to delete sections with ids ${failedDeletes
                  .map((result) => result.id)
                  .join(", ")}`
              );
            } else {
              setSections(
                sections.filter(
                  (section) =>
                    !selectedRows.find((row) => row.id === section.id)
                )
              );
            }
          });
        }}
      />
    </main>
  );
};

export default ListOfSections;
