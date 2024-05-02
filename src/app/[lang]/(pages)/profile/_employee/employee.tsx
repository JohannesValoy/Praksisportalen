/** @format */

"use client";

import SectionTable from "@/app/components/DynamicTables/SectionTable";

export default function EmployeePage({ user }) {
  return (
    <SectionTable
      headers={{
        Name: "name",
        "Section Type": "sectionType",
        "Leader Email": "email",
        "Created At": "createdAt",
        "Updated At": "updatedAt",
      }}
      filter={{ hasEmployeeID: user.id }}
    />
  );
}
