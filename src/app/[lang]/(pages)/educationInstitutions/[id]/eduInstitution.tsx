"use client";

import { useState } from "react";
import DynamicTable from "@/app/_components/DynamicTables/DynamicTable";
import { editDetails } from "./action";
import { EducationInstitution } from "@/app/_models/EducationInstitution";
import {
  deleteStudyProgram,
  paginateStudyPrograms,
} from "../../studyprograms/actions";
import StudentTable from "@/app/_components/DynamicTables/StudentTable";
import AddStudyProgram from "@/app/_components/Modals/AddStudyProgramModal";
import EditModal from "@/app/_components/Modals/EditModal";

/**
 * The InstitutionPage component displays the details of an education institution.
 * @param root The root object.
 * @param root.eduInstitution The education institution object.
 * @param root.wordbook The wordbook object containing all the translations.
 * @returns The InstitutionPage component.
 */
export default function InstitutionPage({
  eduInstitution,
  wordbook,
}: {
  readonly eduInstitution: EducationInstitution;
  readonly wordbook: { readonly [key: string]: string };
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [name, setName] = useState(eduInstitution.name || "");

  /**
   * The handleSubmit function updates the education institution details.
   * @param e The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const update = {
      name: name,
    };

    await editDetails(eduInstitution.id, update);

    refreashPage();
  };

  /**
   * The refreashPage function reloads the page.
   */
  const refreashPage = () => {
    window.location.reload();
  };

  /**
   * The closeAddModal function closes the add department modal.
   * It also triggers a refresh by updating the refresh key.
   */
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <>
      {isAddModalOpen && (
        <AddStudyProgram
          openModal={isAddModalOpen}
          onClose={closeAddModal}
          educationInstitution={eduInstitution}
        />
      )}
      <div className="flex flex-col items-center">
        <div className="flex flex-row gap-1 items-start">
          <h1>{eduInstitution?.name}</h1>
          <button onClick={() => setShowModal(true)} aria-label="Edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <dialog open={showModal === true} className="modal">
            <div className="modal-box">
              <div className="flex flex-row justify-between w-full">
                <h2 className="font-bold text-lg">Edit</h2>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="btn btn-error btn-sm btn-circle"
                >
                  x
                </button>
              </div>
              <EditModal
                name={eduInstitution.name}
                setName={setName}
                handleSubmit={handleSubmit}
                disabled={name === eduInstitution.name}
              ></EditModal>
            </div>
          </dialog>
        </div>
        <p>Created At: {eduInstitution?.createdAt.toLocaleDateString()}</p>
        <p>Updated At: {eduInstitution?.updatedAt.toLocaleDateString()}</p>
      </div>
      <DynamicTable
        refreshKey={refreshKey}
        tableName={"Study Programs"}
        headers={{ Name: "name" }}
        onRowClick={() => {}}
        filter={{ hasEducationInstitutionID: eduInstitution?.id.toString() }}
        onAddButtonClick={() => {
          setIsAddModalOpen(true);
        }}
        deleteFunction={deleteStudyProgram}
        paginateFunction={paginateStudyPrograms}
      />
      <StudentTable
        filter={{
          educationInstitutionID: eduInstitution.id,
        }}
      />
    </>
  );
}
