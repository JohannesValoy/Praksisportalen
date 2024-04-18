/** @format */
/** @format */

"use client";
import React, { useState, useEffect, use } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { UserPageRequest } from "@/app/_models/pageinition";
import { deleteCoordinator, paginateCoordinators } from "./actions";

const ListOfUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const headers = { Name: "name", Email: "email" };
  const [sortedBy, setSortedBy] = useState<string>("name");
  const [totalPages, setTotalPages] = useState(0);
  //TODO make server action for this
  const url = `/api/s`;
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    const request = {
      page,
      size: pageSize,
      sort: sortedBy,
    } as UserPageRequest;

    paginateCoordinators(request).then((data) => {
      setTotalPages(data.totalPages);
      const rows = data.elements.map((element) => ({
        ...element,
      }));
      setPageSize(data.size);
      setUsers(rows);
    });
  }, [page, sortedBy, pageSize]);

  const handleEmailClick = (row) => {
    window.location.href = `/profile?id=${row.id}`;
  };

  const clickableColumns = {
    email: handleEmailClick,
  };

  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        rows={users}
        setRows={setUsers}
        tableName={"Coordinators"}
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/profile?id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/users/addUser?role=coordinator`;
        }}
        clickableColumns={clickableColumns}
        setSortedBy={setSortedBy}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        onDeleteButtonClicked={() => {
          //Deletes selected rows
          selectedRows.forEach((row) => {
            deleteCoordinator(row.id);
          }, setSelectedRows([]));
        }}
      />
    </div>
  );
};

export default ListOfUsers;
