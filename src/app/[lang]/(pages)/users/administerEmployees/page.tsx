/** @format */
/** @format */
"use client";
import DynamicTable from "@/app/components/DynamicTable";
import { paginateEmployees } from "./actions";
import { deleteEmployee } from "@/services/EmployeeService";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { useState } from "react";

const ListOfUsers = ({ params }) => {
  const [words, setWords] = useState();
  getDictionary(params.lang).then((words) =>
    setWords(words?.administerEmployees),
  );
  const headers = { Name: "name", Email: "email" };
  console.log(params.lang);
  console.log("words", words);
  const handleEmailClick = (row) => {
    window.location.href = `/profile?id=${row.id}`;
  };

  const clickableColumns = {
    email: handleEmailClick,
  };
  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
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
    </div>
  );
};

export default ListOfUsers;
