/** @format */
/** @format */

"use client";
import React from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteStudent, paginateStudents } from "./actions";

const ListOfStudents = () => {
  const headers = { Name: "name", Email: "email" };

  const handleEmailClick = (row) => {
    window.location.href = `/profile?id=${row.id}`;
  };

  const clickableColumns = {
    email: handleEmailClick,
  };

  return (
    <div>
      <DynamicTable
        tableName={"Students"}
        headers={headers}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/profile?id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/users/addUser?role=student`;
        }}
        clickableColumns={clickableColumns}
        deleteFunction={deleteStudent}
        paginateFunction={paginateStudents}
      />
    </div>
  );
};

export default ListOfStudents;
