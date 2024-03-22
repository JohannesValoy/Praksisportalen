/** @format */
/** @format */

"use client";
import React, { useState, useEffect } from "react";

const ListOfStudies = () => {
  const [studies, setStudies] = useState([]);

  useEffect(() => {
    fetch(`/api/studyPrograms`) // Adjusted the fetch URL to match backend routing.
      .then((res) => res.json())
      .then((data) => setStudies(data)) // Ensure proper data handling.
      .catch((error) => console.error("Failed to fetch studies", error)); // Error handling.
  }, []);
  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="overflow-x-auto w-full p-4">
          <h1 className="text-3xl font-semibold">List of StudyPrograms</h1>
          <div>
            <table className="table my-4">
              {studies.map((study, index) => (
                <tbody key={index}>
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12"></div>
                        </div>
                        <div>
                          <div className="font-bold">{study?.name}</div>
                        </div>
                      </div>
                    </td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfStudies;
