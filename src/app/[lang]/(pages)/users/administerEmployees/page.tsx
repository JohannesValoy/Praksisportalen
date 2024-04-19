/** @format */
/** @format */

"use client";
import React, { useState, useEffect } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { paginateEmployees } from "./actions";
import { deleteEmployee } from "@/services/EmployeeService";

const ListOfUsers = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const headers = { Name: "name", Email: "email" };

  const handleEmailClick = (row) => {
    window.location.href = `/profile?id=${row.id}`;
  };

  const clickableColumns = {
    email: handleEmailClick,
  };
  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        tableName={"Employees"}
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
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
