"use client";
import { useState } from "react";
import AddDepartment from "../../../components/Modals/AddDepartmentModal";
import DepartmentTable from "@/app/components/DynamicTables/DepartmentTable";

/**
 * The ListOfDepartments component displays a list of departments.
 * @param user The user object.
 */
const ListOfDepartments = ({ user }) => {
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
    <>
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
    </>
  );
};

export default ListOfDepartments;
