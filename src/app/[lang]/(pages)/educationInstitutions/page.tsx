/** @format */

"use client";
import React from "react";
import DynamicTable from "@/app/components/DynamicTable";
import {
  deleteEducationInstitution,
  paginateEducationInstitutions,
} from "./actions";

const ListOfEducationInstitutions = () => {
  const headers = { Name: "name", id: "id" };

  return (
    <>
      <DynamicTable
        tableName={"Education Institutions"}
        headers={headers}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          throw new Error("Not implemented");
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/educationInstitutions/add`;
        }}
        deleteFunction={deleteEducationInstitution}
        paginateFunction={paginateEducationInstitutions}
      />
    </>
  );
};

export default ListOfEducationInstitutions;
