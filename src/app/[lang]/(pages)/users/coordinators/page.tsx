"use client";
import React from "react";
import DynamicTable from "@/app/_components/DynamicTables/DynamicTable";
import { deleteCoordinator, paginateCoordinators } from "./actions";
import { useRouter } from "next/navigation";

/**
 * The ListOfCoordinators component displays a list of coordinators.
 * @returns A list of coordinators.
 */
const ListOfCoordinators = () => {
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
      headers={{ Name: "name", Email: "email" }}
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
