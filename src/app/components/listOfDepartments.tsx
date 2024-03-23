/** @format */

"use client";
import React, { useEffect, useState } from "react";
const ListOfDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    fetch("/api/departments").then((res) => res.json().then(setDepartments));
  }, []);

  type Department = {
    name: string;
    id: string;
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold">List of Departments</h1>
      <table className="table my-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th></th>
          </tr>
        </thead>
        {departments.map((department, index) => (
          <tbody key={index}>
            <tr>
              <th>
                <div className="font-bold">{department?.name}</div>
              </th>
              <td>leader@leader.email.no</td>
              <td>{department?.id}</td>
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

export default ListOfDepartments;
