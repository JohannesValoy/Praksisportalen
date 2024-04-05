/** @format */

"use client";

import DynamicTable from "@/app/components/DynamicTable";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ListOfInternships = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("section_id");
  const [internships, setInternships] = useState<Internship[]>([]);
  const [selectedRows, setSelectedRows] = useState<Internship[]>([]);
  const headers = {
    Name: "name",
    "Max Capacity": "maxCapacity",
    "Current Capacity": "currentCapacity",
  };
  const [sortedBy, setSortedBy] = useState<string>("name");
  const clickableColumns = {
    employee_email: (row) => {
      window.location.href = `/profile/?id=${row.employee_id}`;
    },
  };

  useEffect(() => {
    const fetchUrl =
      id !== null ? `/api/internships?section_id=${id}` : "/api/internships";

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          // If data.elements is present, map over it to create a new array
          // where each element is a flattened version of the original element.
          // If data.elements is not present, use data directly.
          const rows = data.elements
            ? data.elements.map((element) => ({
                ...element,
              }))
            : [
                {
                  ...data,
                },
              ];

          setInternships(rows);
        }
      });
  }, [id]);

  type Internship = {
    name: string;
    id: string;
    employee_id: string;
    employee_email: string;
  };

  return (
    <main className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
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
      />
    </main>
  );
};

export default ListOfInternships;
