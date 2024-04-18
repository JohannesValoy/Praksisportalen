/** @format */

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { InternshipAgreementPageRequest } from "@/app/_models/Agreement";
import { paginateInternshipAgreements } from "./actions";
const ListOfInternshipAgreements = () => {
  const [internshipAgreements, setInternshipAgreements] = useState<
    InternshipAgreement[]
  >([]);
  const [sortedBy, setSortedBy] = useState<string>("name");
  const [selectedRows, setSelectedRows] = useState<InternshipAgreement[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const headers = {
    Status: "status",
    " Start Date": "startDate",
    "End Date": "endDate",
  };
  useEffect(() => {
    const request = {
      page: page,
      size: pageSize,
      sort: sortedBy,
    } as InternshipAgreementPageRequest;
    paginateInternshipAgreements(request).then((data) => {
      setTotalElements(data.totalElements);
      setPageSize(data.size);
      const rows = data.elements.map((element) => ({
        name: element.internship.name,
        id: element.id,
      }));
      setInternshipAgreements(rows);
    });
  }, [page, sortedBy, pageSize]);

  type InternshipAgreement = {
    name: string;
    id: number;
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
          window.location.href = `./internships/?department_id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `./internships/addInternship`;
        }}
        setSortedBy={setSortedBy}
        url="/api/internships/"
        setRows={setInternshipAgreements}
        page={page}
        setPage={setPage}
        totalElements={internshipAgreements.length}
        pageSize={pageSize}
      />
    </div>
  );
};

export default ListOfInternshipAgreements;
