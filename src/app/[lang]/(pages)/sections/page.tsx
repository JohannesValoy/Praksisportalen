/** @format */

"use client";
import React from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteSection, paginateSections } from "./action";
import ContainerBox from "@/app/components/ContainerBox";

const ListOfSections = () => {
  const headers = { Name: "name", Email: "email" };

  return (
    <>
      <DynamicTable
        tableName={"Sections"}
        headers={headers}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/internships/?section_id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/sections/addSection`;
        }}
        deleteFunction={deleteSection}
        paginateFunction={paginateSections}
      />
    </>
  );
};

export default ListOfSections;
