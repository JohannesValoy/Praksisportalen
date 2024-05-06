"use client";

import StudentTable from "@/app/_components/DynamicTables/StudentTable";

/**
 * The CoordinatorPage component displays a table of students.
 * @param root The root object.
 * @param root.user The user object.
 * @param root.educationInstitutionID The education institution ID.
 * @returns The CoordinatorPage component.
 */
export default function CoordinatorPage({ user, educationInstitutionID }) {
  return (
    <StudentTable
      filter={{
        educationInstitutionID: educationInstitutionID?.toString(),
      }}
    />
  );
}
