/** @format */

"use client";
import { useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteSection, paginateSections } from "./action";
import AddSection from "../../../components/Modals/AddSectionModal";

export default function ListOfSections({
  wordbook,
}: {
  readonly wordbook: { readonly [key: string]: string };
}) {
  const headers = { Name: "name", Email: "email" };
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <>
      {isAddModalOpen && (
        <AddSection openModal={isAddModalOpen} onClose={closeAddModal} />
      )}
      <DynamicTable
        refreshKey={refreshKey}
        tableName={"Sections"}
        headers={headers}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/sections/${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          setIsAddModalOpen(true);
        }}
        deleteFunction={deleteSection}
        paginateFunction={paginateSections}
      />
    </>
  );
}
