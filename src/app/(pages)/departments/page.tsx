/** @format */

"use client";
import React, { useEffect, useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import Department from "@/app/_models/Department";
const ListOfDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedRows, setSelectedRows] = useState<Department[]>([]);
  const headers = { Name: "name", Email: "email" };
  const [sortedBy, setSortedBy] = useState<string>("name");
  const clickableColumns = {
    //TODO update this once the api is finished
    email: (row) => {
      window.location.href = `/profile?id=${row.employee_id}`;
    },
  };

  useEffect(() => {
    fetch(`/api/departments?sort=${sortedBy}`)
      .then((res) => res.json())
      .then((data) => {
        const modifiedData = data.elements.map((department: any) => ({
          name: department.name,
          email: department.employee.email, // Assuming employee object has an email property
          id: department.id,
          employee_id: department.employee.id,
        }));
        setDepartments(modifiedData);
      })
      .catch((error) => console.error("Failed to fetch departments", error));
  }, []);

  console.log(departments);
  return (
    <div className="flex flex-row justify-center mt-4 overflow-x-auto p-4">
      <div className="w-full">
        <DynamicTable
          rows={departments}
          tableName="departments"
          headers={headers}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          onRowClick={() => {}}
          onRowButtonClick={(row) => {
            window.location.href = `/sections/?department_id=${row.id}`;
          }}
          buttonName={"Details"}
          onAddButtonClick={() => {
            window.location.href = `/departments/addDepartment`;
          }}
          setSortedBy={setSortedBy}
          url="/api/departments/"
          setRows={setDepartments}
          clickableColumns={clickableColumns}
        />
      </div>
    </div>
  );
};

export default ListOfDepartments;
