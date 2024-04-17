/** @format */

"use client";

import DynamicTable from "@/app/components/DynamicTable";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Internship,
  InternshipPaginationRequest,
} from "@/app/_models/InternshipPosition";
import { paginateInternships } from "./action";

const ListOfInternships = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("section_id");
  const [totalElements, setTotalElements] = useState<number>(0);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [selectedRows, setSelectedRows] = useState<Internship[]>([]);
  const headers = {
    Name: "name",
    "Max Capacity": "maxCapacity",
    "Current Capacity": "currentCapacity",
  };
  const [page, setPage] = useState(0);
  const [sortedBy, setSortedBy] = useState<string>("name");
  const clickableColumns = {
    employee_email: (row) => {
      window.location.href = `/profile/?id=${row.employee_id}`;
    },
  };

  useEffect(() => {
    //TODO: Fix from static to dynamic size maybe :)
    const request = { page, size: 10 } as InternshipPaginationRequest;
    paginateInternships(request).then((data) => {
      // If data.elements is present, map over it to create a new array
      // where each element is a flattened version of the original element.
      // If data.elements is not present, use data directly.
      const totalElements = data.totalElements;
      setTotalElements(totalElements);
      setInternships(data.elements);
    });
  }, [id, page, sortedBy]);

  console.log(page);

  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        rows={internships}
        tableName="Internships"
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
        clickableColumns={clickableColumns}
        setSortedBy={setSortedBy}
        url={"/api/internships/"}
        setRows={setInternships}
        page={page}
        pageSize={10}
        setPage={setPage}
        totalElements={totalElements}
      />
    </div>
  );
};

export default ListOfInternships;
