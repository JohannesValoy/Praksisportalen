/** @format */

"use client";
import React from "react";
import StudentTable from "@/app/components/DynamicTables/StudentTable";

export default function ListOfStudents({
  wordbook,
  user,
  educationInstitutionID,
}: {
  readonly user: {
    readonly id: string;
    readonly role?: string;
  };
  readonly wordbook: { readonly [key: string]: string };
  readonly educationInstitutionID?: number;
}) {
  return (
    <StudentTable
      filter={{
        educationInstitutionID: educationInstitutionID?.toString(),
      }}
    />
  );
}
