/** @format */

"use client";
import React from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteDepartment, paginateDepartments } from "./actions";

const ListOfDepartments = () => {
  const headers = { Name: "name", Email: "email" };

  return (
    <DynamicTable
      tableName={"Departments"}
      headers={headers}
      onRowClick={() => {}}
      onRowButtonClick={(row) => {
        window.location.href = `/departments/${row.id}`;
      }}
      buttonName={"Details"}
      onAddButtonClick={() => {
        window.location.href = `/departments/add`;
      }}
      deleteFunction={deleteDepartment}
      paginateFunction={paginateDepartments}
    />
  );
};

export default ListOfDepartments;
