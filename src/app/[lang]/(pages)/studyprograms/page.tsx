/** @format */
/** @format */

"use client";
import React, { useState, useEffect } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { paginateStudyPrograms } from "./actions";

const ListOfStudies = () => {
  const [studies, setStudies] = useState<Study[]>([]);
  const [selectedRows, setSelectedRows] = useState<Study[]>([]);
  const headers = { Name: "name", id: "id" };
  const [sortedBy, setSortedBy] = useState<string>("name");
  const [totalElements, setTotalElements] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  type Study = {
    name: string;
    id: string;
    employee: {
      email: string;
    };
  };
  useEffect(() => {
    const request = new StudyProgramPageRequest(0, 10, sortedBy, "", "");
    paginateStudyPrograms(request.toJSON()).then((data) => {
      const totalElements = data.totalElements;
      const rows = data.elements.map((element) => ({
        ...element,
      }));
      setTotalElements(totalElements);
      setStudies(rows);
    });
  }, [sortedBy]);

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
        url="/api/studyPrograms/"
        setRows={setStudies}
        page={page}
        setPage={setPage}
        totalElements={totalElements}
      />
    </div>
  );
};

export default ListOfStudies;
