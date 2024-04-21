/** @format */

"use client";
import React, { useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteSection, paginateSections } from "./action";
import { Section } from "@/app/_models/Section";

const ListOfSections = () => {
  const [selectedRows, setSelectedRows] = useState<Section[]>([]);
  const headers = { Name: "name", Email: "email" };

  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
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
    </div>
  );
};

export default ListOfSections;
