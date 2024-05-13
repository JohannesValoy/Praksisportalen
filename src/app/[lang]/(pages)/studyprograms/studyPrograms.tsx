"use client";
import React, { useState } from "react";
import DynamicTable from "@/app/_components/DynamicTables/DynamicTable";
import { deleteStudyProgram, paginateStudyPrograms } from "./actions";
import AddStudyProgram from "@/app/_components/Modals/AddStudyProgramModal";

/**
 * The ListOfStudies component displays a list of study programs.
 * @param root The root object.
 * @param root.wordbook The wordbook object containing all the translations.
 * @returns A list of study programs.
 */
export default function ListOfStudies({
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
        <AddStudyProgram openModal={isAddModalOpen} onClose={closeAddModal} />
      )}
      <DynamicTable
        refreshKey={refreshKey}
        tableName={"Study Programs"}
        headers={{
          "Study name": "name",
          "Institution name": "educationInstitutionName",
        }}
        onRowClick={() => {}}
        onAddButtonClick={() => {
          setIsAddModalOpen(true);
        }}
        deleteFunction={deleteStudyProgram}
        paginateFunction={paginateStudyPrograms}
      />
    </>
  );
}
