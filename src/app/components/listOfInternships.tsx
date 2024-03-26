/** @format */

"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ListOfInternships = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("section_id");
  const [internships, setInternships] = useState<Internship[]>([]);

  useEffect(() => {
    if (id !== null) {
      fetch(`/api/internships/${id}`)
        .then((res) => res.json())
        .then((data) => setInternships([data]));
    } else {
      fetch(`/api/internships`)
        .then((res) => res.json())
        .then(setInternships);
    }
  }, [id]);

  type Internship = {
    name: string;
    id: string;
    employee_id: string;
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
                  <Link
                    href="/"
                    className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                  >
                    Add Internship
                  </Link>
                </th>
              </tr>
            </thead>
            {internships.map((internship, index) => (
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
                  <td>none</td>
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
            ))}
          </table>
        </div>
      ) : (
        <p>Loading internship details...</p>
      )}
    </div>
  );
};

export default ListOfInternships;
