"use client";
import React from "react";
import DynamicTable from "@/app/components/DynamicTable";
import {
  deleteInternshipAgreement,
  paginateInternshipAgreements,
} from "./actions";

const ListOfInternshipAgreements = () => {
  const headers = {
    Name: "name",
    "Start Date": "startDate",
    "End Date": "endDate",
  };

  return (
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
  );
};

export default ListOfInternshipAgreements;
