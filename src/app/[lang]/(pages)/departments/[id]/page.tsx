/** @format */

"use client";

import { useEffect, useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteSection, paginateSections } from "../../sections/action";
import { fetchDepartmentDetails } from "./action";

export default function Page({
  params,
}: {
  readonly params: { readonly id: string };
}) {
  const [department, setDepartment] = useState<Department>();

  type Department = {
    name: string;
    employee_id?: string;
    created_at?: Date;
    updated_at?: Date;
    employee?: {
      email: string;
      name: string;
    };
  };

  useEffect(() => {
    fetchDepartmentDetails(params.id).then((data) => {
      setDepartment(data);
    });
  }, [params]);

  return (
    <>
      {department ? (
        <>
          <div className="flex flex-col items-center">
            <h1>Department: {department.name}</h1>
            <p>Leader name: {department.employee.name}</p>
            <p>Created At: {department.created_at.toLocaleDateString()}</p>
            <p>Updated At: {department.updated_at.toLocaleDateString()}</p>
          </div>
          <DynamicTable
            tableName={"sections"}
            headers={{
              Name: "name",
              Email: "email",
              "Created At": "created_at",
              "Updated At": "updated_at",
            }}
            filter={{ department_id: params.id }}
            onRowClick={() => {}}
            onRowButtonClick={(row) => {
              window.location.href = `/sections/${row.id}`;
            }}
            buttonName={"Details"}
            readonly={true}
            deleteFunction={deleteSection}
            onAddButtonClick={() => {
              window.location.href = `/sections/add`;
            }}
            paginateFunction={paginateSections}
          />
        </>
      ) : (
        <p>Loading Profile details...</p>
      )}
    </>
  );
}
