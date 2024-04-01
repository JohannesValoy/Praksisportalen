/** @format */

"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Internship } from "knex/types/tables.js";
import UniversalList from "./UniversalList";

const ListOfInternships = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("section_id");
  const [internships, setInternships] = useState<Internship[]>([]);
  const [selectedRows, setSelectedRows] = useState<Internship[]>([]);
  const headers = { Name: "name", Email: "employee_email", ID: "id" };
  const clickableColumns = {
    employee_email: (row) => {
      window.location.href = `/profile/?id=${row.employee_id}`;
    },
  };

  useEffect(() => {
    if (id !== null) {
      fetch(`/api/internships/${id}`)
        .then((res) => res.json())
        .then((data) => setInternships(data));
    } else {
      fetch(`/api/internships`)
        .then((res) => res.json())
        .then(setInternships);
    }
  }, [id]);
  console.log(internships);

  type Internship = {
    name: string;
    id: string;
    employee_id: string;
    employee_email: string;
  };

  return (
    <main className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <UniversalList
        rows={internships}
        tableName="Internships"
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/admin/administerInternships/individualInternship?internship_id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/admin/administerInternships/addInternship`;
        }}
        clickableColumns={clickableColumns}
      />
    </main>
  );
};

export default ListOfInternships;
