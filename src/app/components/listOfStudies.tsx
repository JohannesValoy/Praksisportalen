/** @format */
/** @format */

"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const ListOfStudies = () => {
  const [studies, setStudies] = useState<Study[]>([]);
  type Study = {
    name: string;
  };

  useEffect(() => {
    fetch(`/api/studyPrograms`) // Adjusted the fetch URL to match backend routing.
      .then((res) => res.json())
      .then((data) => setStudies(data)) // Ensure proper data handling.
      .catch((error) => console.error("Failed to fetch studies", error)); // Error handling.
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold">List of StudyPrograms</h1>
      <table className="table my-4">
        <thead>
          <tr>
            <th>
              <input type="checkbox" className="checkbox" />
            </th>
            <th>Name</th>
            <th>
              <Link
                href="/admin/administerStudyPrograms"
                className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                Add Study
              </Link>
            </th>
          </tr>
        </thead>
        {studies.map((study, index) => (
          <tbody key={index}>
            <tr>
              <td>
                <input type="checkbox" className="checkbox" />
              </td>
              <td>
                <div className="font-bold">{study?.name}</div>
              </td>
              <th>
                <button className="btn btn-ghost btn">details</button>
              </th>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default ListOfStudies;
