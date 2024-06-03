"use client";
import { useState } from "react";
import AddDepartment from "../../../_components/Modals/AddDepartmentModal";
import DepartmentTable from "@/app/_components/DynamicTables/DepartmentTable";
import { Role } from "@/app/api/auth/[...nextauth]/nextauth";

/**
 * The ListOfDepartments component displays a list of departments.
 * @param root The root object.
 * @param root.user The user object.
 * @returns The ListOfDepartments component.
 */
const ListOfDepartments = ({ user }) => {
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
      {isAddModalOpen && <AddDepartment onClose={closeAddModal} />}
      <DepartmentTable
        refreshKey={refreshKey}
        readOnly={user.role !== Role.admin}
        onAddButtonClick={() => {
          setIsAddModalOpen(true);
        }}
      />
    </>
  );
};

export default ListOfDepartments;
