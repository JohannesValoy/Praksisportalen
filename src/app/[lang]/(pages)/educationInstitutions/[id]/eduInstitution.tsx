/** @format */

"use client";

import { useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import { editDetails } from "./action";
import { EducationInstitution } from "@/app/_models/EducationInstitution";
import {
  deleteStudyProgram,
  paginateStudyPrograms,
} from "../../studyprograms/actions";

export default function InstitutionPage({
  eduInstitution,
  wordbook,
}: {
  readonly eduInstitution: EducationInstitution;
  readonly wordbook: { readonly [key: string]: string };
}) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const update = {
      name: name,
    };

    await editDetails(eduInstitution.id, update);

    refreashPage();
  };

  const refreashPage = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-row">
          <h1>{eduInstitution?.name}</h1>
          <button className="btn btn-sm" onClick={() => setShowModal(true)}>
            edit
          </button>
          <dialog open={showModal === true} className="modal">
            <div className="modal-box">
              <div className="flex flex-row justify-between w-full">
                <h2 className="font-bold text-lg">
                  Edit {eduInstitution?.name}
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
                        className="input input-bordered "
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
        filter={{ hasEducationInstitutionID: eduInstitution.id.toString() }}
        onAddButtonClick={() => {
          window.location.href = `/studyprograms/add`;
        }}
        deleteFunction={deleteStudyProgram}
        paginateFunction={paginateStudyPrograms}
      />
    </>
  );
}
