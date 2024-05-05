"use client";

import SectionTable from "@/app/components/DynamicTables/SectionTable";

/**
 * The EmployeePage component displays a table of sections.
 * @param root The root object.
 * @param root.user The user object.
 * @returns The EmployeePage component.
 */
export default function EmployeePage({ user }) {
  return <SectionTable filter={{ hasEmployeeID: user.id }} />;
}
