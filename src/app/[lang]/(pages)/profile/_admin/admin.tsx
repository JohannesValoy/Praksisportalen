/** @format */

"use client";
import Image from "next/image";

import DynamicTable from "@/app/components/DynamicTable";
import { paginateSections } from "../../sections/action";

export default function AdminPage({ user }) {
  return (
    <DynamicTable
      tableName={"sections"}
      headers={{
        Name: "name",
        Type: "section_type",
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
