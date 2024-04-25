/** @format */
/** @format */

"use client";
import React from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteStudyProgram, paginateStudyPrograms } from "./actions";

const ListOfStudies = () => {
  const headers = { Name: "name", id: "id" };

  return (
    <DynamicTable
      tableName={"Study Programs"}
      headers={headers}
      onRowClick={() => {}}
      onRowButtonClick={(row) => {
        throw new Error("Not implemented");
      }}
      buttonName={"Details"}
      onAddButtonClick={() => {
        window.location.href = `/studyprograms/add`;
      }}
      deleteFunction={deleteStudyProgram}
      paginateFunction={paginateStudyPrograms}
    />
  );
};

export default ListOfStudies;
