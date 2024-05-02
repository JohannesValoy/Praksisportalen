"use client";
import { useState } from "react";
import AddDepartment from "../../../components/Modals/AddDepartmentModal";
import DepartmentTable from "@/app/components/DynamicTables/DepartmentTable";

const ListOfDepartments = ({ user }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

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
