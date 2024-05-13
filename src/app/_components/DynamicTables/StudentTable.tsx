import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DynamicTable from "./DynamicTable";
import {
  deleteStudent,
  paginateStudents,
} from "@/app/[lang]/(pages)/users/students/actions";
import AddStudentModal from "../Modals/AddStudentModal";

interface StudentTableProps {
  filter?: any;
  user?: any;
  educationInstitutions?: { id: number; name: string }[];
}

/**
 * The StudentTable component displays a list of students.
 * @param root The root object.
 * @param root.filter The filter object.
 * @param root.user The user object.
 * @param root.educationInstitutions The education institutions object.
 * @returns A list of students.
 */
const StudentTable: React.FC<StudentTableProps> = ({
  filter,
  user,
  educationInstitutions,
}) => {
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleClick = (id: string) => {
    router.push(`/profile/${id}`);
  };

  const handleEmailClick = (user) => {
    handleClick(user.id);
  };

  const clickableColumns = {
    email: handleEmailClick,
  };

  /**
   * The closeAddModal function closes the add department modal.
   */
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <>
      {isAddModalOpen && (
        <AddStudentModal
          onClose={closeAddModal}
          eduInstitutionID={filter?.educationInstitutionID}
          educationInstitutions={educationInstitutions}
        />
      )}
      <DynamicTable
        refreshKey={refreshKey}
        tableName={"Students"}
        headers={{ Name: "name", Email: "email" }}
        onRowClick={() => {}}
        onRowButtonClick={(user) => {
          handleClick(user.id);
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          setIsAddModalOpen(true);
        }}
        filter={filter}
        clickableColumns={clickableColumns}
        deleteFunction={deleteStudent}
        paginateFunction={paginateStudents}
      />
    </>
  );
};

export default StudentTable;
