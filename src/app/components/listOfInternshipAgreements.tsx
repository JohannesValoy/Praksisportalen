/** @format */

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const ListOfInternshipAgreements = () => {
  const [internshipAgreements, setInternshipAgreements] = useState<
    InternshipAgreement[]
  >([]);

  useEffect(() => {
    fetch("/api/InternshipAgreement").then((res) =>
      res.json().then(setInternshipAgreements)
    );
  }, []);

  type InternshipAgreement = {
    name: string;
    id: string;
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold">List of Internship Agreements</h1>
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
              <Link
                href="/"
                className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                Add Internship Agreement
              </Link>
            </th>
          </tr>
        </thead>
        {internshipAgreements.map((internshipAgreement, index) => (
          <tbody key={index}>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>
                <div className="font-bold">{internshipAgreement?.name}</div>
              </th>
              <td>none</td>
              <td>{internshipAgreement?.id}</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default ListOfInternshipAgreements;
