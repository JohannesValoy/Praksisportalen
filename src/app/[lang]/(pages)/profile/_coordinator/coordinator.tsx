/** @format */

"use client";

import DynamicTable from "@/app/components/DynamicTable";
import router from "next/router";
import { deleteStudent, paginateStudents } from "../../users/students/actions";

export default function CoordinatorPage({ user, educationInstitutionID }) {
  const handleEmailClick = (user) => {
    handleClick(user.id);
  };

  const clickableColumns = {
    email: handleEmailClick,
  };

  const handleClick = (id: string) => {
    router.push(`/profile/${id}`);
  };
  return (
    <DynamicTable
      tableName={"Students"}
      headers={{ Name: "name", Email: "email" }}
      onRowClick={() => {}}
      buttonName={"Details"}
      onAddButtonClick={() => {
        window.location.href = `/users/students/add`;
      }}
      filter={{ educationInstitutionID: educationInstitutionID.toString() }}
      clickableColumns={clickableColumns}
      deleteFunction={deleteStudent}
      paginateFunction={paginateStudents}
    />
  );
}
