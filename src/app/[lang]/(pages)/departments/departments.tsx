/** @format */

"use client";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteDepartment, paginateDepartments } from "./actions";

const ListOfDepartments = ({ user }) => {
  const headers = { "Department name": "name", "Leader Email": "email" };

  return (
    <DynamicTable
      tableName={"Departments"}
      headers={headers}
      onRowClick={() => {}}
      onRowButtonClick={(row) => {
        window.location.href = `/departments/${row.id}`;
      }}
      buttonName={"Details"}
      onAddButtonClick={() => {
        window.location.href = `/departments/add`;
      }}
      readonly={user.role !== "admin"}
      deleteFunction={deleteDepartment}
      paginateFunction={paginateDepartments}
    />
  );
};

export default ListOfDepartments;
