/** @format */
/** @format */

"use client";
import React from "react";
import DynamicTable from "@/app/components/DynamicTables/DynamicTable";
import {
  deleteInternshipAgreement,
  paginateInternshipAgreements,
} from "./actions";

export default function ListOfInternshipAgreements({
  wordbook,
}: {
  readonly wordbook: { readonly [key: string]: string };
}) {
  const headers = {
    status: "status",
    "Start Date": "startDate",
    "End Date": "endDate",
  };

  return (
    <DynamicTable
      tableName={"Internship Agreements"}
      headers={headers}
      onRowClick={() => {}}
      onRowButtonClick={(row) => {
        window.location.href = `/internshipAgreements/${row.id}`;
      }}
      buttonName={"Details"}
      deleteFunction={deleteInternshipAgreement}
      paginateFunction={paginateInternshipAgreements}
    />
  );
}
