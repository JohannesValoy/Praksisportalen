"use client";

import { useState } from "react";
import DynamicTable from "@/app/components/DynamicTables/DynamicTable";
import { editDetails } from "./action";
import { EducationInstitution } from "@/app/_models/EducationInstitution";
import {
  deleteStudyProgram,
  paginateStudyPrograms,
} from "../../studyprograms/actions";
import StudentTable from "@/app/components/DynamicTables/StudentTable";

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
  console.log(eduInstitution);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [name, setName] = useState("");

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

  return (
    <>
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
                <h2 className="font-bold text-lg">
                  Edit {eduInstitution.name}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="btn btn-error btn-sm btn-circle"
                >
                  x
                </button>
              </div>

              <div className="modal-action">
                <form
                  className="w-full"
                  method="dialog"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col items-center w-full gap-6">
                    <label className="form-control w-full ">
                      <div className="label">
                        <span className="label-text">Name</span>
                      </div>
                      <input
                        type="name"
                        placeholder="name"
                        className="input input-bordered text-base-content "
                        onChange={(e) => setName(e.target.value.trim())}
                        maxLength={255}
                        aria-label="Set first name"
                      />
                    </label>

                    <div className="flex flex-row justify-end w-full">
                      <button
                        type="submit"
                        className="btn btn-accent"
                        disabled={!name}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <p>Created At: {eduInstitution?.createdAt.toLocaleDateString()}</p>
        <p>Updated At: {eduInstitution?.updatedAt.toLocaleDateString()}</p>
      </div>
      <DynamicTable
        tableName={"Study Programs"}
        headers={{ Name: "name" }}
        onRowClick={() => {}}
        filter={{ hasEducationInstitutionID: eduInstitution?.id.toString() }}
        onAddButtonClick={() => {
          window.location.href = `/studyprograms/add`;
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
