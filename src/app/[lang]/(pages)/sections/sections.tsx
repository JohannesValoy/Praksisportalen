/** @format */

"use client";
import { useState } from "react";
import { deleteSection } from "./action";
import AddSection from "../../../components/Modals/AddSectionModal";
import SectionTable from "@/app/components/DynamicTables/SectionTable";

export default function ListOfSections({
  wordbook,
}: {
  readonly wordbook: { readonly [key: string]: string };
}) {
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
      <SectionTable
        refreshKey={refreshKey}
        headers={{
          Name: "name",
          "Section Type": "sectionType",
          "Leader Email": "email",
          "Created At": "createdAt",
          "Updated At": "updatedAt",
        }}
        deleteFunction={deleteSection}
        onAddButtonClick={() => {
          setIsAddModalOpen(true);
        }}
      />
    </>
  );
}
