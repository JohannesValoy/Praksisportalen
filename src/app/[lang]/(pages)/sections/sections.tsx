/** @format */

"use client";
import React from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteSection, paginateSections } from "./action";

export default function ListOfSections({
  wordbook,
}: {
  readonly wordbook: { readonly [key: string]: string };
}) {
  const headers = { Name: "name", Email: "email" };

  return (
    <DynamicTable
      tableName={"Sections"}
      headers={headers}
      onRowClick={() => {}}
      onRowButtonClick={(row) => {
        window.location.href = `/sections/${row.id}`;
      }}
      buttonName={"Details"}
      onAddButtonClick={() => {
        window.location.href = `/sections/add`;
      }}
      deleteFunction={deleteSection}
      paginateFunction={paginateSections}
    />
  );
}
