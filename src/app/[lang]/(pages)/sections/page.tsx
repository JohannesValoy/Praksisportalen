/** @format */

"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SectionObject, { SectionPageRequest } from "@/app/_models/Section";
import DynamicTable from "@/app/components/DynamicTable";
import { paginateSections } from "./action";

const ListOfSections = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("department_id");
  const [sections, setSections] = useState<SectionObject[]>([]);
  const [selectedRows, setSelectedRows] = useState<SectionObject[]>([]);
  const headers = { Name: "name", Email: "email" };
  const [sortedBy, setSortedBy] = useState<string>("name");
  const [page, setPage] = useState(0);

  const clickableColumns = {
    email: (row) => {
      window.location.href = `/profile/?id=${row.employee_id}`;
    },
  };
  useEffect(() => {
    const request = new SectionPageRequest(page, 10, sortedBy, -1, -1, "");
    paginateSections(request.toJSON()).then((data) => {
      const rows = data.elements.map((element) => ({
        ...element,
        email: element.employee.email,
        employee_id: element.employee.id,
      }));

      setSections(rows);
    });
  }, [page, sortedBy]);
  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4 ">
      <DynamicTable
        rows={sections}
        tableName="Sections"
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/internships/?section_id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/sections/addSection`;
        }}
        setSortedBy={setSortedBy}
        url="/api/sections/"
        setRows={setSections}
        clickableColumns={clickableColumns}
        setPage={setPage}
        page={page}
      />
    </div>
  );
};

export default ListOfSections;
