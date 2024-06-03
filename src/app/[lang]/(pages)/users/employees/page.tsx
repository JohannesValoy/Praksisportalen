"use client";
import DynamicTable from "@/app/_components/DynamicTables/DynamicTable";
import { paginateEmployees } from "./actions";
import { deleteEmployee } from "@/services/EmployeeService";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AddEmployee from "@/app/_components/Modals/AddEmployeeModal";

/**
 * The ListOfEmployees component displays a list of employees.
 * @param root The root object.
 * @param root.params The params object.
 * @returns The ListOfEmployees component.
 */
const ListOfEmployees = ({ params }) => {
  const [words, setWords] = useState<any>({});
  const headers = { Name: "name", Email: "email" };
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

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

  /**
   * The closeAddModal function closes the add department modal.
   */
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setRefreshKey((oldKey) => oldKey + 1);
  };
  return (
    <>
      {isAddModalOpen && <AddEmployee onClose={closeAddModal} />}
      <DynamicTable
        refreshKey={refreshKey}
        tableName={words?.header || "Employees"}
        headers={headers}
        onRowClick={() => {}}
        onRowButtonClick={(user) => {
          handleClick(user.id);
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          setIsAddModalOpen(true);
        }}
        clickableColumns={clickableColumns}
        deleteFunction={deleteEmployee}
        paginateFunction={paginateEmployees}
      />
    </>
  );
};

export default ListOfEmployees;
