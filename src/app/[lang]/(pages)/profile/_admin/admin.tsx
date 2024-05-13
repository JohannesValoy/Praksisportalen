"use client";

import DepartmentTable from "@/app/_components/DynamicTables/DepartmentTable";
import InternshipTable from "@/app/_components/DynamicTables/InternshipTable";
import SectionTable from "@/app/_components/DynamicTables/SectionTable";
import AddDepartment from "@/app/_components/Modals/AddDepartmentModal";
import { useState } from "react";

/**
 * The AdminPage component displays a list of departments, a list of sections, and a list of internships.
 * @param root The root object.
 * @param root.user The user object.
 * @returns The AdminPage component.
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
      {isAddModalOpen && <AddDepartment onClose={closeAddModal} />}
      <DepartmentTable
        refreshKey={refreshKey}
        readOnly={user.role !== "admin"}
        onAddButtonClick={() => {
          setIsAddModalOpen(true);
        }}
      />
    </div>
  );
}
