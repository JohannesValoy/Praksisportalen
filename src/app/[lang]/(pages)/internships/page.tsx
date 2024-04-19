/** @format */

"use client";
import React, { useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteInternship, paginateInternships } from "./action";
import { Internship } from "@/app/_models/InternshipPosition";

const ListOfInternships = () => {
  const [selectedRows, setSelectedRows] = useState<Internship[]>([]);
  const headers = {
    Name: "name",
    "Max Capacity": "maxCapacity",
    "Current Capacity": "currentCapacity",
  };

  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        tableName={"Internships"}
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/internships/individualInternship?internship_id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/internships/addInternship`;
        }}
        deleteFunction={deleteInternship}
        paginateFunction={paginateInternships}
      />
    </div>
  );
};

export default ListOfInternships;
