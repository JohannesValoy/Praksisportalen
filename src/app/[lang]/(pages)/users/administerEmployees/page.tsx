/** @format */

"use client";

import React from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { paginateEmployees } from "./actions";
import { deleteEmployee } from "@/services/EmployeeService";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { useState } from "react";

const ListOfEmployees = ({ params }) => {
  const [words, setWords] = useState<any>({});
  getDictionary(params.lang).then((words) =>
    setWords(words?.administerEmployees)
  );
  const headers = { Name: "name", Email: "email" };
  const handleEmailClick = (row) => {
    window.location.href = `/profile?id=${row.id}`;
  };

  const clickableColumns = {
    email: handleEmailClick,
  };
  return (
    <>
      <DynamicTable
        tableName={words?.header || "Employees"}
        headers={headers}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/profile?id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/users/addUser?role=employee`;
        }}
        clickableColumns={clickableColumns}
        deleteFunction={deleteEmployee}
        paginateFunction={paginateEmployees}
      />
    </>
  );
};

export default ListOfEmployees;
