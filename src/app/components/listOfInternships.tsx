/** @format */

"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Internship } from "knex/types/tables.js";

const ListOfInternships = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("section_id");
  const [internships, setInternships] = useState<Internship[]>([]);

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
    <div className="p-10">
      {internships ? (
        <div>
          <h1 className="text-3xl font-semibold">List of Internships</h1>
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
                <th>ID</th>
                <th>
                  <a
                    href={`/admin/administerInternships/addInternship`}
                    className="btn btn-xs"
                  >
                    Add Internship
                  </a>
                </th>
              </tr>
            </thead>

            {Array.isArray(internships) &&
            internships.filter(
              (internship) =>
                internship.name &&
                internship.id &&
                internship.employee_id &&
                internship.employee_email
            ).length > 0 ? (
              internships.map((internship, index) => (
                <tbody key={index}>
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <th>
                      <div className="font-bold">{internship?.name}</div>
                    </th>
                    <td>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => {
                          window.location.href = `/profile/?id=${internship.employee_id}`;
                        }}
                      >
                        {internship?.employee_email}
                      </button>
                    </td>
                    <td>{internship?.id}</td>
                    <th>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => {
                          window.location.href = `/admin/administerInternships/individualInternship?internship_id=${internship.id}`;
                        }}
                      >
                        details
                      </button>
                    </th>
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody>
                <tr>
                  <td colSpan={5}>Empty</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      ) : (
        <p>Loading internship details...</p>
      )}
    </div>
  );
};

export default ListOfInternships;
