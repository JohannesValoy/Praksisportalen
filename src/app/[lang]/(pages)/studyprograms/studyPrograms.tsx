"use client";
import React from "react";
import DynamicTable from "@/app/components/DynamicTables/DynamicTable";
import { deleteStudyProgram, paginateStudyPrograms } from "./actions";

/**
 * The ListOfStudies component displays a list of study programs.
 * @param root The root object.
 * @param root.wordbook The wordbook object containing all the translations.
 * @returns A list of study programs.
 */
export default function ListOfStudies({
  wordbook,
}: {
  readonly wordbook: { readonly [key: string]: string };
}) {
  const headers = { Name: "name", id: "id" };

  return (
    <DynamicTable
      tableName={"Study Programs"}
      headers={headers}
      onRowClick={() => {}}
      onAddButtonClick={() => {
        window.location.href = `/studyprograms/add`;
      }}
      deleteFunction={deleteStudyProgram}
      paginateFunction={paginateStudyPrograms}
    />
  );
}
