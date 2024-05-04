"use client";

import StudentTable from "@/app/components/DynamicTables/StudentTable";

/**
 * The CoordinatorPage component displays a table of students.
 * @param user The user object.
 * @param educationInstitutionID The education institution ID.
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
