/** @format */
/** @format */

"use client";
import React, { useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import {
  deleteEducationInstitution,
  paginateEducationInstitutions,
} from "./actions";
import { EducationInstitution } from "@/app/_models/EducationInstitution";

const ListOfEducationInstitutions = () => {
  const [selectedRows, setSelectedRows] = useState<EducationInstitution[]>([]);
  const headers = { Name: "name", id: "id" };

  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        tableName={"Education Institutions"}
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/profile?id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/educationInstitutions/add`;
        }}
        deleteFunction={deleteEducationInstitution}
        paginateFunction={paginateEducationInstitutions}
      />
    </div>
  );
};

export default ListOfEducationInstitutions;
