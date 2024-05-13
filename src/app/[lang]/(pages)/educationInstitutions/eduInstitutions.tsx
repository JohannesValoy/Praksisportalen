"use client";
import React, { useState } from "react";
import DynamicTable from "@/app/_components/DynamicTables/DynamicTable";
import {
  deleteEducationInstitution,
  paginateEducationInstitutions,
} from "./actions";
import AddEduInstitut from "@/app/_components/Modals/AddEduInstitutModal";

/**
 * The ListOfEducationInstitutions component displays a list of education institutions.
 * @param root The root object.
 * @param root.wordbook The wordbook object containing all the translations.
 * @returns The ListOfEducationInstitutions component.
 */
export default function ListOfEducationInstitutions({
  wordbook,
}: {
  readonly wordbook: { readonly [key: string]: string };
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  /**
   * The closeAddModal function closes the add department modal.
   * It also triggers a refresh by updating the refresh key.
   */
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <>
      {isAddModalOpen && (
        <AddEduInstitut onClose={closeAddModal} />
      )}
      <DynamicTable
        tableName={"Education Institutions"}
        headers={{ Name: "name" }}
        refreshKey={refreshKey}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/educationInstitutions/${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          setIsAddModalOpen(true);
        }}
        deleteFunction={deleteEducationInstitution}
        paginateFunction={paginateEducationInstitutions}
      />
    </>
  );
}
