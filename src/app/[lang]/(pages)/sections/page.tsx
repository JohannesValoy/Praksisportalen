/** @format */

"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SectionObject from "@/app/_models/Section";
import DynamicTable from "@/app/components/DynamicTable";

const ListOfSections = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("department_id");
  const [sections, setSections] = useState<SectionObject[]>([]);
  const [selectedRows, setSelectedRows] = useState<SectionObject[]>([]);
  const headers = { Name: "name", Email: "email" };
  const [sortedBy, setSortedBy] = useState<string>("name");

  const clickableColumns = {
    email: (row) => {
      window.location.href = `/profile/?id=${row.employee_id}`;
    },
  };
  useEffect(() => {
    const fetchUrl =
      id !== null ? `/api/sections/${id}&sort=${sortedBy}` : `/api/sections`;

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          // If data.elements is present, map over it to create a new array
          // where each element is a flattened version of the original element.
          // If data.elements is not present, use data directly.
          const rows = data.elements
            ? data.elements.map((element) => ({
                ...element,
                email: element.employee.email,
                employee_id: element.employee.id,
              }))
            : [
                {
                  ...data,
                  email: data.employee.email,
                  employee_id: data.employee.id,
                },
              ];

          setSections(rows);
        }
      });
  }, [id, sortedBy]);
  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4 ">
      <DynamicTable
        rows={sections}
        tableName="Sections"
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/internships/?section_id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/sections/addSection`;
        }}
        setSortedBy={setSortedBy}
        url="/api/sections/"
        setRows={setSections}
        clickableColumns={clickableColumns}
      />
    </div>
  );
};

export default ListOfSections;
