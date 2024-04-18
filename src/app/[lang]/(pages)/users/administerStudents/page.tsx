/** @format */
/** @format */

"use client";
import React, { useState, useEffect, use } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteStudent, paginateStudents } from "./actions";
import { StudentPageRequest } from "@/app/_models/Student";

const ListOfStudents = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const headers = { Name: "name", Email: "email" };
  const [sortedBy, setSortedBy] = useState<string>("name");
  //TODO make server action for this
  const url = `/api/students`;
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    const request = {
      page,
      size: pageSize,
      sort: sortedBy,
    } as StudentPageRequest;
    paginateStudents(request).then((data) => {
      const totalPages = data.totalPages;

      const rows = data.elements.map((element) => ({
        ...element,
      }));
      setTotalPages(totalPages);
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
        tableName={"Students"}
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/profile?id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/users/addUser?role=student`;
        }}
        clickableColumns={clickableColumns}
        setSortedBy={setSortedBy}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        onDeleteButtonClicked={() => {
          selectedRows.forEach((row) => {
            //Deletes selected rows
            deleteStudent(row.id);
          });
          setSelectedRows([]);
        }}
      />
    </div>
  );
};

export default ListOfStudents;
