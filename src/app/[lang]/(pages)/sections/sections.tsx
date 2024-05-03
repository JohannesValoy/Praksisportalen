"use client";
import { useState } from "react";
import { deleteSection } from "./action";
import AddSection from "../../../components/Modals/AddSectionModal";
import SectionTable from "@/app/components/DynamicTables/SectionTable";

/**
 * The ListOfSections component displays a list of sections.
 * @param wordbook The wordbook object containing all the translations.
 */
export default function ListOfSections({
  wordbook,
}: {
  readonly wordbook: { readonly [key: string]: string };
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  /**
   * The closeAddModal function closes the add section modal.
   */
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <>
      {isAddModalOpen && (
        <AddSection openModal={isAddModalOpen} onClose={closeAddModal} />
      )}
      <SectionTable
        refreshKey={refreshKey}
        deleteFunction={deleteSection}
        onAddButtonClick={() => {
          setIsAddModalOpen(true);
        }}
      />
    </>
  );
}
