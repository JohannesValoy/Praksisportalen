/** @format */

"use client";
import { useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteInternship, paginateInternships } from "./action";
import AddInternship from "../../../components/Modals/AddInternshipModal";

export default function ListOfInternships({
  wordbook,
}: {
  readonly wordbook: { readonly [key: string]: string };
}) {
  const headers = {
    "Internship name": "name",
    "Max Capacity": "maxCapacity",
    "Current Capacity": "currentCapacity",
  };
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <>
      {isAddModalOpen && (
        <AddInternship openModal={isAddModalOpen} onClose={closeAddModal} />
      )}
      <DynamicTable
        refreshKey={refreshKey}
        tableName={"Internships"}
        headers={headers}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/internships/${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          setIsAddModalOpen(true);
        }}
        deleteFunction={deleteInternship}
        paginateFunction={paginateInternships}
      />
    </>
  );
}
