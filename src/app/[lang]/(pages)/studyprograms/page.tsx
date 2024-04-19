/** @format */
/** @format */

"use client";
import React, { useState, useEffect } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteStudyProgram, paginateStudyPrograms } from "./actions";
import { StudyProgram } from "@/app/_models/StudyProgram";

const ListOfStudies = () => {
  const [selectedRows, setSelectedRows] = useState<StudyProgram[]>([]);
  const headers = { Name: "name", id: "id" };

  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        tableName={"Students"}
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/profile?id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/users/addUser?role=student`;
        }}
        deleteFunction={deleteStudyProgram}
        paginateFunction={paginateStudyPrograms}
      />
    </div>
  );
};

export default ListOfStudies;
