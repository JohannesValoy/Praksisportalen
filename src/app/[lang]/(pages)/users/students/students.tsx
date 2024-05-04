"use client";
import React from "react";
import StudentTable from "@/app/components/DynamicTables/StudentTable";

/**
 * The ListOfStudents component displays a list of students.
 * @param wordbook The wordbook object containing all the translations.
 * @param user The user object.
 * @param educationInstitutionID The education institution ID.
 * @returns A list of students.
 */
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
