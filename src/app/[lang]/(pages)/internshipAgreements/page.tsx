/** @format */

"use client";
import React, { useEffect, useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { InternshipAgreementPageRequest } from "@/app/_models/Agreement";
import {
  deleteInternshipAgreement,
  paginateInternshipAgreements,
} from "./actions";
const ListOfInternshipAgreements = () => {
  const [internshipAgreements, setInternshipAgreements] = useState<
    InternshipAgreement[]
  >([]);
  const [sortedBy, setSortedBy] = useState<string>("name");
  const [selectedRows, setSelectedRows] = useState<InternshipAgreement[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const headers = {
    Status: "status",
    Name: "name",
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
      setTotalPages(data.totalPages);
      const rows = data.elements.map((element) => ({
        name: element.internship.name,
        id: element.id,
        status: element.status,
        startDate: element.startDate.toLocaleDateString(),
        endDate: element.endDate.toLocaleDateString(),
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
        setRows={setInternshipAgreements}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        deleteFunction={deleteInternshipAgreement}
      />
    </div>
  );
};

export default ListOfInternshipAgreements;
