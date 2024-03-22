/** @format */

"use client";
import React, { useEffect, useState } from "react";
const ListOfDepartments = () => {
  const [departments, setdepartments] = useState([]);

  useEffect(() => {
    fetch("/api/departments").then((res) => res.json().then(setdepartments));
  }, []);

  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="overflow-x-auto w-full p-4">
          <h1 className="text-3xl font-semibold">List of Departments</h1>
          <table className="table my-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {departments.map((department, index) => (
              <tbody key={index}>
                <tr>
                  <td>
                    <div>
                      <div className="font-bold">{department?.name}</div>
                    </div>
                  </td>
                  <td>
                    leader
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {department?.id}
                    </span>
                  </td>
                  <td>{department?.id}</td>
                  <th className="flex justify-end">
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListOfDepartments;
