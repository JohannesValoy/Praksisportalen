/** @format */
/** @format */

"use client";
import React, { useEffect, useState } from "react";
const ListOfStudents = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users/students").then((res) => res.json().then(setUsers));
  }, []);

  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="overflow-x-auto w-full p-4">
          <h1 className="text-3xl font-semibold">List of Students</h1>
          <div>
            <table className="table my-4">
              {users.map((user, index) => (
                <tbody key={index}>
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user?.email}</td>
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

export default ListOfStudents;
