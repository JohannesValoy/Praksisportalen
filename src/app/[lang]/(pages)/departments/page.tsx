/** @format */

"use client";
import React, { useEffect, useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { DepartmentPageRequest } from "@/app/_models/Department";
import { paginateDepartments } from "./actions";
const ListOfDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const headers = { Name: "name", Email: "email" };
  const [sortedBy, setSortedBy] = useState<string>("departments.name");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const clickableColumns = {
    //TODO update this once the api is finished
    email: (row) => {
      window.location.href = `/profile?id=${row.employee_id}`;
    },
  };

  useEffect(() => {
    const request = {
      page,
      size: pageSize,
      sort: sortedBy,
    } as DepartmentPageRequest;
    paginateDepartments(request).then((data) => {
      const totalPages = data.totalPages;
      const rows = data.elements.map((element) => ({
        name: element.name,
        email: element.employee.email,
        id: element.id,
      }));
      setTotalPages(totalPages);
      setDepartments(rows);
    });
  }, [sortedBy, pageSize, page]);

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
          url="/api/departments"
          setRows={setDepartments}
          clickableColumns={clickableColumns}
          setPage={setPage}
          page={page}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default ListOfDepartments;
