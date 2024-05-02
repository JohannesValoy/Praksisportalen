/** @format */

"use client";
import { useState } from "react";
import DynamicTable from "@/app/components/DynamicTables/DynamicTable";
import { deleteDepartment, paginateDepartments } from "./actions";
import AddDepartment from "../../../components/Modals/AddDepartmentModal";

const ListOfDepartments = ({ user }) => {
  const headers = { "Department name": "name", "Leader Email": "email" };
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
      <DynamicTable
        refreshKey={refreshKey}
        tableName={"Departments"}
        headers={headers}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/departments/${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          setIsAddModalOpen(true);
        }}
        readonly={user.role !== "admin"}
        deleteFunction={deleteDepartment}
        paginateFunction={paginateDepartments}
      />
    </>
  );
};

export default ListOfDepartments;
