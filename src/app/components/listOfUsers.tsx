/** @format */
/** @format */

"use client";
import React, { useState, useEffect } from "react";

const ListOfUsers = ({ role }: { role: string }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`/api/users?role=${role}`) // Adjusted the fetch URL to match backend routing.
      .then((res) => res.json())
      .then((data) => setUsers(data)) // Ensure proper data handling.
      .catch((error) => console.error("Failed to fetch users", error)); // Error handling.
  }, [role]);
  return (
    <div className="flex justify-center mt-4 overflow-x-auto  p-4">
      <div className="w-full">
        <h1 className="text-3xl font-semibold">List of {role}s</h1>
        <table className="table my-4">
          {" "}
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {users.map((user, index) => (
            <tbody key={index}>
              <tr>
                <th>
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="/example-profile-picture.jpg"
                      alt="Description"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </th>
                <td>
                  <div className="font-bold">{user?.name}</div>
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
  );
};

export default ListOfUsers;
