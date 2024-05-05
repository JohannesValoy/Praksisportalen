import React from "react";
import DynamicTable from "./DynamicTable";
import { paginateSections } from "@/app/[lang]/(pages)/sections/action";

interface SectionTableProps {
  refreshKey?: any;
  filter?: any;
  readOnly?: boolean;
  deleteFunction?: any;
  onAddButtonClick?: () => void;
}

/**
 * The SectionTable component displays a list of sections.
 * @param root The root object.
 * @param root.refreshKey The refresh key.
 * @param root.filter The filter object.
 * @param root.readOnly The readOnly flag.
 * @param root.deleteFunction The delete function.
 * @param root.onAddButtonClick The on add button click function.
 * @returns A list of sections.
 */
const SectionTable: React.FC<SectionTableProps> = ({
  refreshKey,
  filter,
  readOnly,
  deleteFunction,
  onAddButtonClick,
}) => {
  return (
    <DynamicTable
      refreshKey={refreshKey}
      tableName={"Sections"}
      headers={{
        "Section name": "name",
        "Section Type": "sectionType",
        "Leader Email": "email",
        "Created At": "createdAt",
        "Updated At": "updatedAt",
      }}
      filter={filter}
      onRowClick={() => {}}
      onRowButtonClick={(row) => {
        window.location.href = `/sections/${row.id}`;
      }}
      buttonName={"Details"}
      readOnly={readOnly}
      deleteFunction={deleteFunction}
      onAddButtonClick={onAddButtonClick}
      paginateFunction={paginateSections}
    />
  );
};

export default SectionTable;
