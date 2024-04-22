/** @format */
/** @format */

"use client";
import React, { useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import {
  deleteInternshipAgreement,
  paginateInternshipAgreements,
} from "./actions";
import { InternshipAgreement } from "@/app/_models/Agreement";

const ListOfInternshipAgreements = () => {
  const [selectedRows, setSelectedRows] = useState<InternshipAgreement[]>([]);
  const headers = {
    Status: "status",
    Name: "name",
    "Start Date": "startDate",
    "End Date": "endDate",
  };

  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        tableName={"Internship Agreements"}
        headers={headers}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/internshipAgreements/individualInternshipAgreement?internshipAgreement_id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `./internships/addInternship`;
        }}
        deleteFunction={deleteInternshipAgreement}
        paginateFunction={paginateInternshipAgreements}
      />
    </div>
  );
};

export default ListOfInternshipAgreements;
