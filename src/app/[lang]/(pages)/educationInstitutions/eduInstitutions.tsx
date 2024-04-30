/** @format */

"use client";
import React from "react";
import DynamicTable from "@/app/components/DynamicTable";
import {
  deleteEducationInstitution,
  paginateEducationInstitutions,
} from "./actions";

export default function ListOfEducationInstitutions({
  wordbook,
}: {
  readonly wordbook: { readonly [key: string]: string };
}) {
  const headers = { Name: "name", id: "id" };

  return (
    <DynamicTable
      tableName={"Education Institutions"}
      headers={headers}
      onRowClick={() => {}}
      onRowButtonClick={(row) => {
        window.location.href = `/educationInstitutions/${row.id}`;
      }}
      buttonName={"Details"}
      onAddButtonClick={() => {
        window.location.href = `/educationInstitutions/add`;
      }}
      deleteFunction={deleteEducationInstitution}
      paginateFunction={paginateEducationInstitutions}
    />
  );
}
