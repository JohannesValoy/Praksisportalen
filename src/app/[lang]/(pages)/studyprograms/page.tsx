/** @format */
/** @format */

"use client";
import React, { useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteStudyProgram, paginateStudyPrograms } from "./actions";
import { StudyProgram } from "@/app/_models/StudyProgram";

const ListOfStudies = () => {
  const [selectedRows, setSelectedRows] = useState<StudyProgram[]>([]);
  const headers = { Name: "name", id: "id" };

  return (
    <>
      <DynamicTable
        tableName={"Study Programs"}
        headers={headers}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          throw new Error("Not implemented");
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/users/addUser?role=student`;
        }}
        deleteFunction={deleteStudyProgram}
        paginateFunction={paginateStudyPrograms}
      />
    </>
  );
};

export default ListOfStudies;
