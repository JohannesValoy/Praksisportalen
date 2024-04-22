/** @format */
/** @format */

"use client";
import React, { useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteCoordinator, paginateCoordinators } from "./actions";

const ListOfCoordinators = () => {
  const headers = { Name: "name", Email: "email" };

  const handleEmailClick = (row) => {
    window.location.href = `/profile?id=${row.id}`;
  };

  const clickableColumns = {
    email: handleEmailClick,
  };

  return (
    < >
      <DynamicTable
        tableName={"Coordinators"}
        headers={headers}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/profile?id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/users/addUser?role=coordinator`;
        }}
        clickableColumns={clickableColumns}
        deleteFunction={deleteCoordinator}
        paginateFunction={paginateCoordinators}
      />
    </>
  );
};

export default ListOfCoordinators;
