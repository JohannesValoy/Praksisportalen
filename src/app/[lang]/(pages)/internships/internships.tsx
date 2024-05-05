"use client";
import { useState } from "react";
import AddInternship from "../../../components/Modals/AddInternshipModal";
import InternshipTable from "@/app/components/DynamicTables/InternshipTable";

/**
 * The ListOfInternships component displays a table of internships and an add button.
 * @param root The root object.
 * @param root.wordbook The wordbook object containing all the translations.
 * @returns A table of internships and an add button.
 */
export default function ListOfInternships({
  wordbook,
}: {
  readonly wordbook: { readonly [key: string]: string };
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  /**
   * The closeAddModal function closes an add modal and triggers a refresh by updating the refresh key.
   */
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <>
      {isAddModalOpen && (
        <AddInternship openModal={isAddModalOpen} onClose={closeAddModal} />
      )}
      <InternshipTable
        refreshKey={refreshKey}
        onAddButtonClick={() => {
          setIsAddModalOpen(true);
        }}
      />
    </>
  );
}
