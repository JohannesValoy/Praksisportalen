import React from "react";
import DynamicTable from "./DynamicTable";
import { paginateSections } from "@/app/[lang]/(pages)/sections/action";

interface SectionTableProps {
  refreshKey?: any;
  headers: any;
  filter?: any;
  readonly?: boolean;
  deleteFunction?: any;
  onAddButtonClick?: () => void;
}

const SectionTable: React.FC<SectionTableProps> = ({
  refreshKey,
  headers,
  filter,
  readonly,
  deleteFunction,
  onAddButtonClick,
}) => {
  return (
    <DynamicTable
      refreshKey={refreshKey}
      tableName={"Sections"}
      headers={headers}
      filter={filter}
      onRowClick={() => {}}
      onRowButtonClick={(row) => {
        window.location.href = `/sections/${row.id}`;
      }}
      buttonName={"Details"}
      readonly={readonly}
      deleteFunction={deleteFunction}
      onAddButtonClick={onAddButtonClick}
      paginateFunction={paginateSections}
    />
  );
};

export default SectionTable;
