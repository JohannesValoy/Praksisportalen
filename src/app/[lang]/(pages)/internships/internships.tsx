"use client";
import { useState } from "react";
import AddInternship from "../../../components/Modals/AddInternshipModal";
import InternshipTable from "@/app/components/DynamicTables/InternshipTable";

export default function ListOfInternships({
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
