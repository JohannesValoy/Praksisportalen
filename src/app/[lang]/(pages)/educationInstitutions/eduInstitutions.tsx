"use client";
import React from "react";
import DynamicTable from "@/app/_components/DynamicTables/DynamicTable";
import {
  deleteEducationInstitution,
  paginateEducationInstitutions,
} from "./actions";

/**
 * The ListOfEducationInstitutions component displays a list of education institutions.
 * @param root The root object.
 * @param root.wordbook The wordbook object containing all the translations.
 * @returns The ListOfEducationInstitutions component.
 */
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
