/** @format */

"use client";
import React, { useEffect, useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import {
  deleteEducationInstitution,
  paginateEducationInstitutions,
} from "./actions";
import {
  EducationInstitution,
  EducationInstitutionPageRequest,
} from "@/app/_models/EducationInstitution";

const ListOfEducationInstitutions = () => {
  const [educationInstitutions, setEducationInstitutions] = useState<
    EducationInstitution[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<EducationInstitution[]>([]);
  const headers = { Name: "name" };
  const [sortedBy, setSortedBy] = useState<string>("name");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const request = {
      page,
      size: pageSize,
      sort: sortedBy,
    } as EducationInstitutionPageRequest;
    paginateEducationInstitutions(request).then((data) => {
      setTotalPages(data.totalPages);
      const rows = data.elements.map((element) => ({
        ...element,
      }));
      setEducationInstitutions(rows);
    });
  }, [sortedBy, page, pageSize]);

  console.log(educationInstitutions);
  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        rows={educationInstitutions}
        tableName="Education Institutions"
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/sections/?department_id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/educationInstitutions/add`;
        }}
        setSortedBy={setSortedBy}
        setRows={setEducationInstitutions}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        deleteFunction={deleteEducationInstitution}
      />
    </div>
  );
};

export default ListOfEducationInstitutions;
