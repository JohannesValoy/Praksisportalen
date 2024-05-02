/** @format */

"use client";

import StudentTable from "@/app/components/DynamicTables/StudentTable";

export default function CoordinatorPage({ user, educationInstitutionID }) {
  return (
    <StudentTable
      filter={{
        educationInstitutionID: educationInstitutionID?.toString(),
      }}
    />
  );
}
