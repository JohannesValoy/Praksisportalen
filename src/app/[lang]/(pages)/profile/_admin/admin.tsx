"use client";

import DepartmentTable from "@/app/components/DynamicTables/DepartmentTable";
import InternshipTable from "@/app/components/DynamicTables/InternshipTable";
import SectionTable from "@/app/components/DynamicTables/SectionTable";
import AddDepartment from "@/app/components/Modals/AddDepartmentModal";
import { useState } from "react";

export default function AdminPage({ user }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setRefreshKey((oldKey) => oldKey + 1);
  };
  return (
    <div className="flex flex-wrap justify-center">
      <SectionTable />
      <InternshipTable />
      {isAddModalOpen && (
        <AddDepartment openModal={isAddModalOpen} onClose={closeAddModal} />
      )}
      <DepartmentTable
        refreshKey={refreshKey}
        readonly={user.role !== "admin"}
        onAddButtonClick={() => {
          setIsAddModalOpen(true);
        }}
      />
    </div>
  );
}
