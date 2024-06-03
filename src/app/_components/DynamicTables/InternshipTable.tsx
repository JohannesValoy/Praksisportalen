import React from "react";
import DynamicTable from "./DynamicTable";
import {
  deleteInternship,
  paginateInternships,
} from "@/app/[lang]/(pages)/internships/action";

interface DynamicTableProps {
  refreshKey?: any;
  filter?: any;
  onAddButtonClick?: () => void;
}

/**
 * The InternshipTable component displays a list of internships.
 * @param root The root object.
 * @param root.refreshKey The refresh key.
 * @param root.filter The filter object.
 * @param root.onAddButtonClick The on add button click function.
 * @returns A list of internships.
 */
const InternshipTable: React.FC<DynamicTableProps> = ({
  refreshKey,
  filter,
  onAddButtonClick,
}) => {
  return (
    <DynamicTable
      refreshKey={refreshKey}
      tableName={"internships"}
      headers={{
        "Internship name": "name",
        Year: "yearOfStudy",
        "Internship Field": "internshipField",
        "Current Capacity": "currentCapacity",
        "Current available Capacity": "vacancies",
        "Number of Beds": "numberOfBeds",
        "Updated At": "updatedAt",
      }}
      filter={filter}
      onRowClick={() => {}}
      onRowButtonClick={(row) => {
        window.location.href = `/internships/${row.id}`;
      }}
      buttonName={"Details"}
      deleteFunction={deleteInternship}
      onAddButtonClick={onAddButtonClick}
      paginateFunction={paginateInternships}
    />
  );
};

export default InternshipTable;
