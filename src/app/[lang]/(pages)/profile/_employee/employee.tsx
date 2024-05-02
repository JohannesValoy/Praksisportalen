"use client";

import SectionTable from "@/app/components/DynamicTables/SectionTable";

export default function EmployeePage({ user }) {
  return <SectionTable filter={{ hasEmployeeID: user.id }} />;
}
