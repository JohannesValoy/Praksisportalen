"use client";
import type { Department } from "knex/types/tables.js";
import { use, useEffect, useState } from "react";

/** @format */
export default function Page() {
  const [departments, setdepartments] = useState<Department[]>([]);
  useEffect(() => {
    fetch("/api/departments").then((res) => res.json().then(setdepartments));
  }, []);

  return (
    <div>
      <h1>Departments</h1>
      <ul>
        {departments?.map((department) => (
          <li key={department.id}>{department.name}</li>
        ))}
      </ul>
    </div>
  );
}
