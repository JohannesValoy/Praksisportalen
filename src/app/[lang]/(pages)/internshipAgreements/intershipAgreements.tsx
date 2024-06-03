"use client";
import React from "react";
import DynamicTable from "@/app/_components/DynamicTables/DynamicTable";
import {
  deleteInternshipAgreement,
  paginateInternshipAgreements,
} from "./actions";

/**
 * The ListOfInternshipAgreements component displays a list of internship agreements.
 * @param root The root object.
 * @param root.wordbook The wordbook object containing all the translations.
 * @returns A list of internship agreements.
 */
export default function ListOfInternshipAgreements({
  wordbook,
}: {
  readonly wordbook: { readonly [key: string]: string };
}) {
  const headers = {
    Internship: "internship",
    "Study Program": "studyProgram",
    Student: "student",
    "Start Date": "startDate",
    "End Date": "endDate",
  };

  return (
    <DynamicTable
      tableName={"Internship Agreements"}
      headers={headers}
      onRowClick={() => {}}
      deleteFunction={deleteInternshipAgreement}
      paginateFunction={paginateInternshipAgreements}
    />
  );
}
