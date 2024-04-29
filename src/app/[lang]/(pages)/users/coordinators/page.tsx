/** @format */
/** @format */

"use client";
import React from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteCoordinator, paginateCoordinators } from "./actions";
import { useRouter } from "next/navigation";

const ListOfCoordinators = () => {
  const headers = { Name: "name", Email: "email" };
  const router = useRouter();

  const handleEmailClick = (user) => {
    handleClick(user.id);
  };

  const clickableColumns = {
    email: handleEmailClick,
  };

  const handleClick = (id: string) => {
    router.push(`/profile/${id}`);
  };

  return (
    <DynamicTable
      tableName={"Coordinators"}
      headers={headers}
      onRowClick={() => {}}
      onRowButtonClick={(user) => {
        handleClick(user.id);
      }}
      buttonName={"Details"}
      onAddButtonClick={() => {
        window.location.href = `/users/add`;
      }}
      clickableColumns={clickableColumns}
      deleteFunction={deleteCoordinator}
      paginateFunction={paginateCoordinators}
    />
  );
};

export default ListOfCoordinators;
