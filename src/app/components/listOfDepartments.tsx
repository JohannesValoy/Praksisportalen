/** @format */

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UniversalList from "./DynamicTable";
const ListOfDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedRows, setSelectedRows] = useState<Department[]>([]);
  const headers = { Name: "name", Email: "employee_email" };
  const [sortedBy, setSortedBy] = useState<string>("name");
  const clickableColumns = {
    employee_email: (row) => {
      window.location.href = `/profile?id=${row.employee_id}`;
    },
  };

  useEffect(() => {
    fetch("/api/departments").then((res) => res.json().then(setDepartments));
  }, []);

  type Department = {
    name: string;
    id: string;
    employee_id: string;
    employee_email: string;
  };

  return (
    <main className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <UniversalList
        rows={departments}
        tableName="Departments"
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/admin/administerSections/?department_id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/admin/administerDepartments/addDepartment`;
        }}
        clickableColumns={clickableColumns}
        sortableBy={["name", "email"]}
        setSortedBy={setSortedBy}
        url="/api/departments/"
        setRows={setDepartments}
      />
    </main>
  );
};

export default ListOfDepartments;
