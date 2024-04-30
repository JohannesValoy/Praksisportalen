/** @format */

"use client";
import React from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteStudent, paginateStudents } from "./actions";
import { useRouter } from "next/navigation";

export default function ListOfStudents({
  wordbook,
  user,
  educationInstitutionID,
}: {
  readonly user: {
    readonly id: string;
    readonly role?: string;
  };
  readonly wordbook: { readonly [key: string]: string };
  readonly educationInstitutionID?: number;
}) {
  const headers = { Name: "name", Email: "email" };
  const router = useRouter();

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
      headers={headers}
      onRowClick={() => {}}
      onRowButtonClick={(user) => {
        handleClick(user.id);
      }}
      buttonName={"Details"}
      onAddButtonClick={() => {
        window.location.href = `/users/students/add`;
      }}
      filter={{
        educationInstitutionID: educationInstitutionID?.toString(),
      }}
      clickableColumns={clickableColumns}
      deleteFunction={deleteStudent}
      paginateFunction={paginateStudents}
    />
  );
}
