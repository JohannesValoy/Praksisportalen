/** @format */

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const ListOfSections = () => {
  const searchParams = useSearchParams();
  const department_id = searchParams.get("department_id");
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    if (department_id !== null) {
      fetch(`/api/sections/sectionsID?department_id=${department_id}`)
        .then((res) => res.json())
        .then(setSections);
    } else {
      fetch(`/api/sections`)
        .then((res) => res.json())
        .then(setSections);
    }
  }, [department_id]);

  type Section = {
    name: string;
    id: string;
    employee_id: string;
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold">List of Sections</h1>
      <table className="table my-5">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>
              <a
                href={`/admin/administerSections/addSection`}
                className="btn btn-xs"
              >
                Add Section
              </a>
            </th>
          </tr>
        </thead>
        {sections.map((section, index) => (
          <tbody key={index}>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>
                <div className="font-bold">{section?.name}</div>
              </th>
              <td>{section?.employee_id}</td>
              <td>{section?.id}</td>
              <button
                className="btn btn-ghost btn-xs"
                onClick={() => {
                  window.location.href = `/admin/administerInternships/?section_id=${section.id}`;
                }}
              >
                details
              </button>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default ListOfSections;
