/** @format */

"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SectionPageRequest, Section } from "@/app/_models/Section";
import DynamicTable from "@/app/components/DynamicTable";
import { paginateSections } from "./action";

const ListOfSections = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("department_id");
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedRows, setSelectedRows] = useState<Section[]>([]);
  const headers = { Name: "name", Email: "email" };
  const [sortedBy, setSortedBy] = useState<string>("name");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const clickableColumns = {
    email: (row) => {
      window.location.href = `/profile/?id=${row.employee_id}`;
    },
  };
  useEffect(() => {
    const request = {
      page,
      size: pageSize,
      sort: sortedBy,
      department_id: id,
    } as SectionPageRequest;
    paginateSections(request).then((data) => {
      console.log(data);
      setTotalPages(data.totalPages);
      setPageSize(data.size);
      const rows = data.elements.map((element) => ({
        ...element,
        email: element.employee.email,
        employee_id: element.employee.id,
      }));
      setSections(rows);
    });
  }, [page, sortedBy, pageSize]);
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
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default ListOfSections;
