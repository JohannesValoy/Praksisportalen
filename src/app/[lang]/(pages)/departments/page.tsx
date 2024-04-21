/** @format */

"use client";
import React, { useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteDepartment, paginateDepartments } from "./actions";
import { Department } from "@/app/_models/Department";

const ListOfDepartments = () => {
  const headers = { Name: "name", Email: "email" };

  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        tableName={"Departments"}
        headers={headers}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/sections?department_id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/sections/addSection`;
        }}
        deleteFunction={deleteDepartment}
        paginateFunction={paginateDepartments}
      />
    </div>
  );
};

export default ListOfDepartments;
