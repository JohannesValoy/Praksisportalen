import React from "react";
import DynamicTable from "./DynamicTable";
import {
  deleteDepartment,
  paginateDepartments,
} from "@/app/[lang]/(pages)/departments/actions";

interface DynamicTableProps {
  refreshKey?: any;
  readonly?: boolean;
  filter?: any;
  onAddButtonClick?: () => void;
}

const DepartmentTable: React.FC<DynamicTableProps> = ({
  refreshKey,
  readonly,
  filter,
  onAddButtonClick,
}) => {
  const headers = {
    "Department name": "name",
    "Leader Email": "email",
    "Created At": "createdAt",
    "Updated At": "updatedAt",
  };

  return (
    <DynamicTable
      refreshKey={refreshKey}
      tableName={"Departments"}
      headers={headers}
      filter={filter}
      onRowClick={() => {}}
      onRowButtonClick={(row) => {
        window.location.href = `/departments/${row.id}`;
      }}
      buttonName={"Details"}
      readonly={readonly}
      onAddButtonClick={onAddButtonClick}
      deleteFunction={deleteDepartment}
      paginateFunction={paginateDepartments}
    />
  );
};

export default DepartmentTable;
