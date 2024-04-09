/** @format */

"use client";
import React, { useEffect, useState } from "react";
import DynamicTable from "../../components/DynamicTable";

const ListOfEducationInstitutions = () => {
  const [educationInstitutions, setEducationInstitutions] = useState<
    EducationInstitution[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<EducationInstitution[]>([]);
  const headers = { Name: "name" };
  const [sortedBy, setSortedBy] = useState<string>("name");
  const clickableColumns = {
    employee_email: (row) => {
      window.location.href = `/profile?id=${row.employee_id}`;
    },
  };

  useEffect(() => {
    fetch(`/api/educationInstitutions?sort=${sortedBy}`).then((res) =>
      res.json().then(setEducationInstitutions),
    );
  }, [sortedBy]);

  type EducationInstitution = {
    name: string;
    id: string;
  };

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
        clickableColumns={clickableColumns}
        setSortedBy={setSortedBy}
        url="/api/educationInstitutions/"
        setRows={setEducationInstitutions}
      />
    </div>
  );
};

export default ListOfEducationInstitutions;
