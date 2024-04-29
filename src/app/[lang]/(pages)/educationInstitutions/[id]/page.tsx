/** @format */

"use client";

import { useEffect, useState } from "react";
import DynamicTable from "@/app/components/DynamicTable";
import NotFound from "@/app/components/NotFound";
import { editDetails, fetchEducationInstitutionDetails } from "./action";
import { EducationInstitution } from "@/app/_models/EducationInstitution";
import {
  deleteStudyProgram,
  paginateStudyPrograms,
} from "../../studyprograms/actions";

export default function Page({
  params,
}: {
  readonly params: { readonly id: string };
}) {
  const [notFound, setNotFound] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [educationInstitution, setEducationInstitution] =
    useState<EducationInstitution>();

  const [name, setName] = useState("");

  useEffect(() => {
    if (params.id !== null) {
      fetchEducationInstitutionDetails(params.id)
        .then((data) => {
          setEducationInstitution(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Failed to fetch EI details:", error);
          setNotFound(true);
        });
    }
  }, [params]);

  if (notFound) {
    return <NotFound />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const update = {
      name: name,
    };

    await editDetails(params.id, update);

    refreashPage();
  };

  const refreashPage = () => {
    window.location.reload();
  };

  return (
    <>
      {educationInstitution ? (
        <>
          <div className="flex flex-col items-center">
            <div className="flex flex-row">
              <h1>{educationInstitution?.name}</h1>
              <button className="btn btn-sm" onClick={() => setShowModal(true)}>
                edit
              </button>
              <dialog open={showModal === true} className="modal">
                <div className="modal-box">
                  <div className="flex flex-row justify-between w-full">
                    <h2 className="font-bold text-lg">
                      Edit {educationInstitution?.name}
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
            <p>
              Created At:{" "}
              {educationInstitution?.created_at.toLocaleDateString()}
            </p>
            <p>
              Updated At:{" "}
              {educationInstitution?.updated_at.toLocaleDateString()}
            </p>
          </div>
          <DynamicTable
            tableName={"Study Programs"}
            headers={{ Name: "name" }}
            onRowClick={() => {}}
            filter={{ hasEducationInstitutionID: params.id }}
            onAddButtonClick={() => {
              window.location.href = `/studyprograms/add`;
            }}
            deleteFunction={deleteStudyProgram}
            paginateFunction={paginateStudyPrograms}
          />
        </>
      ) : (
        <p>Loading Education Institution details...</p>
      )}
    </>
  );
}
