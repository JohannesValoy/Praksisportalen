/** @format */
"use client";
import DynamicTable from "@/app/components/DynamicTable";
import { paginateEmployees } from "./actions";
import { deleteEmployee } from "@/services/EmployeeService";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ListOfEmployees = ({ params }) => {
  const [words, setWords] = useState<any>({});
  const headers = { Name: "name", Email: "email" };
  const router = useRouter();

  getDictionary(params.lang).then((words) =>
    setWords(words?.administerEmployees),
  );

  const handleEmailClick = (user) => {
    handleClick(user.id);
  };

  const handleClick = (id: string) => {
    router.push(`/profile/${id}`);
  };

  const clickableColumns = {
    email: handleEmailClick,
  };
  return (
    <DynamicTable
      tableName={words?.header || "Employees"}
      headers={headers}
      onRowClick={() => {}}
      onRowButtonClick={(user) => {
        handleClick(user.id);
      }}
      buttonName={"Details"}
      onAddButtonClick={() => {
        window.location.href = `/users/add`;
      }}
      clickableColumns={clickableColumns}
      deleteFunction={deleteEmployee}
      paginateFunction={paginateEmployees}
    />
  );
};

export default ListOfEmployees;
