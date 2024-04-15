/** @format */

"use client";
import React, { useEffect, useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";

const ListOfEducationInstitutions = () => {
  const [educationInstitutions, setEducationInstitutions] = useState<
    EducationInstitution[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<EducationInstitution[]>([]);
  const headers = { Name: "name" };
  const [sortedBy, setSortedBy] = useState<string>("name");

  useEffect(() => {
    fetch(`/api/educationInstitutions`)
      .then((res) => res.json())
      .then((data) => setEducationInstitutions(data.elements));
  }, [sortedBy]);

  type EducationInstitution = {
    name: string;
    id: string;
  };
  console.log(educationInstitutions);
  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        rows={educationInstitutions}
        tableName="Education Institutions"
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/sections/?department_id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/educationInstitutions/add`;
        }}
        setSortedBy={setSortedBy}
        url="/api/educationInstitutions/"
        setRows={setEducationInstitutions}
      />
    </div>
  );
};

export default ListOfEducationInstitutions;
