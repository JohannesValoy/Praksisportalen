/** @format */

"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import UniversalList from "./DynamicTable";
import SectionObject from "../_models/Section";

const ListOfSections = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("department_id");
  const [sections, setSections] = useState<SectionObject[]>([]);
  const [selectedRows, setSelectedRows] = useState<SectionObject[]>([]);
  const headers = { Name: "name", Email: "employee_email" };
  /**TODO add sorted by */
  const [sortedBy, setSortedBy] = useState<string>("name");

  debugger;
  const clickableColumns = {
    employee_email: (row) => {
      window.location.href = `/profile/?id=${row.employee_id}`;
    },
  };

  useEffect(() => {
    if (id !== null) {
      fetch(`/api/sections/${id}`)
        .then((res) => res.json())

        .then((data) => {
          debugger;
          if (data.message) {
            console.error(data.message);
          } else {
            debugger;
            setSections(data);
          }
        });
    } else {
      fetch(`/api/sections`)
        .then((res) => res.json())
        .then(setSections);
    }
  }, [id]);
  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
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
        sortableBy={["name", "email"]}
        setSortedBy={setSortedBy}
        url="/api/sections/"
        setRows={setSections}
      />
    </div>
  );
};

export default ListOfSections;
