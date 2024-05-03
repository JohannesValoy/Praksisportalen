"use client";

import DepartmentTable from "@/app/components/DynamicTables/DepartmentTable";
import InternshipTable from "@/app/components/DynamicTables/InternshipTable";
import SectionTable from "@/app/components/DynamicTables/SectionTable";
import AddDepartment from "@/app/components/Modals/AddDepartmentModal";
import { useState } from "react";

/**
 * The AdminPage component displays a list of departments, a list of sections, and a list of internships.
 * @param user The user object.
 */
export default function AdminPage({ user }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  /**
   * The closeAddModal function closes the add department modal.
   */
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
