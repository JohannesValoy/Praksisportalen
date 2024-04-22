/** @format */
/** @format */

"use client";
import React, { useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import {
  deleteEducationInstitution,
  paginateEducationInstitutions,
} from "./actions";
import { EducationInstitution } from "@/app/_models/EducationInstitution";

const ListOfEducationInstitutions = () => {
  const headers = { Name: "name", id: "id" };

  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
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
    </div>
  );
};

export default ListOfEducationInstitutions;
