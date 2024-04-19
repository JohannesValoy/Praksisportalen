/** @format */
/** @format */

"use client";
import React, { useState, useEffect } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteStudyProgram, paginateStudyPrograms } from "./actions";
import { StudyProgramPageRequest } from "@/app/_models/StudyProgram";

const ListOfStudies = () => {
  const [studies, setStudies] = useState<Study[]>([]);
  const [selectedRows, setSelectedRows] = useState<Study[]>([]);
  const headers = { Name: "name", id: "id" };
  const [sortedBy, setSortedBy] = useState<string>("name");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  type Study = {
    name: string;
    id: number;
    employee: {
      email: string;
    };
  };
  useEffect(() => {
    const request = {
      page,
      size: pageSize,
      sort: sortedBy,
    } as StudyProgramPageRequest;
    paginateStudyPrograms(request).then((data) => {
      const totalPages = data.totalPages;
      const rows = data.elements.map((element) => ({
        name: element.name,
        id: element.id,
        employee: {
          email: element.educationInstitution.name,
        },
      }));
      setTotalPages(totalPages);
      setStudies(rows);
    });
  }, [sortedBy, pageSize, page]);

  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        rows={studies}
        tableName={"Study Programs"}
        headers={headers}
        onRowClick={() => {}}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        onAddButtonClick={() => {
          window.location.href = `/studyprograms/add`;
        }}
        onRowButtonClick={(row) => {
          window.location.href = `/studyprograms/${row.id}`;
        }}
        buttonName={"Details"}
        setSortedBy={setSortedBy}
        setRows={setStudies}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        deleteFunction={deleteStudyProgram}
      />
    </div>
  );
};

export default ListOfStudies;
