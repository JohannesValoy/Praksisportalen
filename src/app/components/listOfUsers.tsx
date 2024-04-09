/** @format */
/** @format */

"use client";
import React, { useState, useEffect } from "react";
import UniversalList from "./DynamicTable";

const ListOfUsers = ({ role }: { role: string }) => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const headers = { Name: "name", Email: "email" };
  const [sortedBy, setSortedBy] = useState<string>("name");
  useEffect(() => {
    fetch(`/api/${role}s?sort=${sortedBy}`) // Adjusted the fetch URL to match backend routing.
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.elements);
      }) // Ensure proper data handling.
      .catch((error) => console.error("Failed to fetch users", error)); // Error handling.
  }, [role, sortedBy]); // Added sortedBy to the dependency array.
  const handleEmailClick = (row) => {
    window.location.href = `/profile?id=${row.id}`;
  };

  const clickableColumns = {
    email: handleEmailClick,
  };

  return (
    <main className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <UniversalList
        rows={users}
        setRows={setUsers}
        tableName={role + "s"}
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/profile?id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/admin/addUser?role=${role}`;
        }}
        clickableColumns={clickableColumns}
        setSortedBy={setSortedBy}
        url="/api/users/"
      />
    </main>
  );
};

export default ListOfUsers;
