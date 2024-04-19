/** @format */

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
const ListOfInternshipAgreements = () => {
  const [internshipAgreements, setInternshipAgreements] = useState<
    InternshipAgreement[]
  >([]);
  const [sortedBy, setSortedBy] = useState<string>("name");
  const [selectedRows, setSelectedRows] = useState<InternshipAgreement[]>([]);
  const headers = {
    Status: "status",
    " Start Date": "startDate",
    "End Date": "endDate",
  };
  useEffect(() => {
    fetch("/api/internshipAgreements").then((res) =>
      res.json().then(setInternshipAgreements)
    );
  }, []);

  type InternshipAgreement = {
    name: string;
    id: string;
  };

  if (sortedBy) {
    internshipAgreements.sort((a, b) => {
      if (a[sortedBy] < b[sortedBy]) {
        return -1;
      }
      if (a[sortedBy] > b[sortedBy]) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        rows={internshipAgreements}
        tableName="Internship Agreements"
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/internshipAgreements/individualInternshipAgreement?internshipAgreement_id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `./internships/addInternship`;
        }}
        setSortedBy={setSortedBy}
        url="/api/internships/"
        setRows={setInternshipAgreements}
      />
    </div>
  );
};

export default ListOfInternshipAgreements;
