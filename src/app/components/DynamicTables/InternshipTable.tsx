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
 * @param refreshKey The refresh key.
 * @param filter The filter object.
 * @param onAddButtonClick The onAddButtonClick function.
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
        "Internship Field": "internshipField",
        "Max Capacity": "maxCapacity",
        "Current Capacity": "currentCapacity",
        "Number of Beds": "numberOfBeds",
        "Created At": "createdAt",
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
