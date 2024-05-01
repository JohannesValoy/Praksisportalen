/** @format */

"use client";

import DynamicTable from "@/app/components/DynamicTable";
import { paginateSections } from "../../sections/action";

export default function EmployeePage({ user }) {
  return (
    <DynamicTable
      tableName={"sections"}
      headers={{
        Name: "name",
        Type: "sectionType",
        Department: "departmentID",
      }}
      filter={{ hasEmployeeID: user.id }}
      onRowClick={() => {}}
      onRowButtonClick={(row) => {
        window.location.href = `/sections/${row.id}`;
      }}
      buttonName={"Details"}
      readonly={true}
      paginateFunction={paginateSections}
    />
  );
}
