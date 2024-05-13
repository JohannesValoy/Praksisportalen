"use client";
import { useState } from "react";
import { deleteSection } from "./action";
import AddSection from "../../../_components/Modals/AddSectionModal";
import SectionTable from "@/app/_components/DynamicTables/SectionTable";

/**
 * The ListOfSections component displays a list of sections.
 * @param root The root object.
 * @param root.wordbook The wordbook object containing all the translations.
 * @returns A list of sections.
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
        <AddSection onClose={closeAddModal} />
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
