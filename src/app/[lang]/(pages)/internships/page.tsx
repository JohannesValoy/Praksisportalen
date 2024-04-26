/** @format */

"use client";
import React from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteInternship, paginateInternships } from "./action";

const ListOfInternships = () => {
  const headers = {
    "Internship name": "name",
    "Max Capacity": "maxCapacity",
    "Current Capacity": "currentCapacity",
  };

  return (
    <DynamicTable
      tableName={"Internships"}
      headers={headers}
      onRowClick={() => {}}
      onRowButtonClick={(row) => {
        window.location.href = `/internships/${row.id}`;
      }}
      buttonName={"Details"}
      onAddButtonClick={() => {
        window.location.href = `/internships/add`;
      }}
      deleteFunction={deleteInternship}
      paginateFunction={paginateInternships}
    />
  );
};

export default ListOfInternships;
