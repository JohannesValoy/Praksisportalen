"use client";
import React, { useEffect, useState } from "react";
import ContainerBox from "@/app/_components/ContainerBox";
import {
  addEducationInstitution,
  fetchEducationInstitution,
} from "../../[lang]/(pages)/educationInstitutions/actions";

type Props = {

  onClose: () => void;
};

/**
 * The AddEduInstitut component displays a form to add an education institution.
 * @param root The root object.
 * @param root.openModal The openModal flag.
 * @param root.onClose The onClose function.
 * @returns A form to add an education institution.
 */
export default function AddEduInstitut({
  
  onClose,
}: Readonly<Props>) {
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (name.trim() === "" || institution.includes(name)) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [name, institution]);

  useEffect(() => {
    fetchEducationInstitution()
      .then((data) => {
        setInstitution(data);
      })
      .catch((error) => console.error("Failed to fetch Study Programs", error));
  }, []);

  /**
   * The handleSubmit function adds a new education institution.
   * @param event The event object.
   * @returns A modal to confirm the addition of the education institution.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = name.trim();
    await addEducationInstitution(data);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" />
      <dialog
        open={true}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="flex flex-col justify-center items-center h-fit w-full">
          <ContainerBox className="items-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 h-full items-center justify-center"
            >
              <h1 className="flex justify-center text-4xl font-bold">
                Add Education Institution
              </h1>
              <input
                type="text"
                placeholder="Education Institution Name"
                className="input input-bordered text-base-content "
                aria-label="Education Institution Name"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={255}
                required
              />
              <div className="flex flex-row gap-5">
                <button type="button" className="btn w-20" onClick={onClose}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-accent w-20"
                  disabled={isSubmitDisabled}
                >
                  Save
                </button>
              </div>
            </form>
          </ContainerBox>
        </div>
      </dialog>
    </>
  );
}
