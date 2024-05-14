"use client";
import React from "react";
import StudentTable from "@/app/_components/DynamicTables/StudentTable";

type Props = {
  wordbook: { [key: string]: string };
  user: {
    id: string;
    role?: string;
  };
  educationInstitutionID?: number;
  educationInstitutions?: { id: number; name: string }[];
};

/**
 * The ListOfStudents component displays a list of students.
 * @param root The root object.
 * @param root.wordbook The wordbook object containing all the translations.
 * @param root.user The user object.
 * @param root.educationInstitutionID The education institution ID.
 * @param root.educationInstitutions The education institutions object.
 * @returns A list of students.
 */
export default function ListOfStudents({
  wordbook,
  user,
  educationInstitutionID,
  educationInstitutions,
}: Readonly<Props>) {
  return (
    <StudentTable
      educationInstitutions={educationInstitutions}
      user={user}
      filter={{
        educationInstitutionID: educationInstitutionID?.toString(),
      }}
    />
  );
}
