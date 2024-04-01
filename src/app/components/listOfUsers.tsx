/** @format */
/** @format */

"use client";
import React, { useState, useEffect } from "react";
import UserView from "../api/users/UserView";
import UniversalList from "./UniversalList";

const ListOfUsers = ({ role }: { role: string }) => {
  const [users, setUsers] = useState<UserView[]>([]);
  const [selectedRows, setSelectedRows] = useState<UserView[]>([]);
  const headers = { Name: "name", Email: "email" };
  const [sortedBy, setSortedBy] = useState<string>("name");
  useEffect(() => {
    fetch(`/api/users?role=${role}&sort=${sortedBy}`) // Adjusted the fetch URL to match backend routing.
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
        tableName="Users"
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
        sortableBy={["id", "name", "email"]}
        setSortedBy={setSortedBy}
        onDeleteButtonClicked={() => {
          Promise.all(
            selectedRows.map((row) =>
              fetch(`/api/users/${row.id}`, {
                method: "DELETE",
              }).then((res) => res.json())
            )
          ).then((results) => {
            const failedDeletes = results.filter((result) => !result.success);
            if (failedDeletes.length > 0) {
              alert(
                `Failed to delete users with ids ${failedDeletes
                  .map((result) => result.id)
                  .join(", ")}`
              );
            } else {
              setUsers(
                users.filter(
                  (user) => !selectedRows.find((row) => row.id === user.id)
                )
              );
            }
          });
        }}
      />
    </main>
  );
};

export default ListOfUsers;
