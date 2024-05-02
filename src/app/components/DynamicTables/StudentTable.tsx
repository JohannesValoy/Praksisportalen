import React from "react";
import { useRouter } from "next/navigation";
import DynamicTable from "./DynamicTable";
import {
  deleteStudent,
  paginateStudents,
} from "@/app/[lang]/(pages)/users/students/actions";

interface StudentTableProps {
  filter?: any;
}

const StudentTable: React.FC<StudentTableProps> = ({ filter }) => {
  const router = useRouter();
  console.log(filter);
  const handleClick = (id: string) => {
    router.push(`/profile/${id}`);
  };

  const handleEmailClick = (user) => {
    handleClick(user.id);
  };

  const clickableColumns = {
    email: handleEmailClick,
  };

  return (
    <DynamicTable
      tableName={"Students"}
      headers={{ Name: "name", Email: "email" }}
      onRowClick={() => {}}
      onRowButtonClick={(user) => {
        handleClick(user.id);
      }}
      buttonName={"Details"}
      onAddButtonClick={() => {
        window.location.href = `/users/students/add`;
      }}
      filter={filter}
      clickableColumns={clickableColumns}
      deleteFunction={deleteStudent}
      paginateFunction={paginateStudents}
    />
  );
};

export default StudentTable;
