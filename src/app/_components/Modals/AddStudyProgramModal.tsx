"use client";

import { useState, useEffect } from "react";
import {
  addStudyProgram,
  fetchEducationInstitutions,
  fetchStudyPrograms,
} from "../../[lang]/(pages)/studyprograms/actions";
import ContainerBox from "@/app/_components/ContainerBox";
import EduInstitutionDropdown from "../Dropdowns/EduInstitutionDropdown";

type Props = {
  openModal: boolean;
  onClose: () => void;
  educationInstitution?: any;
};

/**
 * Creates a page that allows for adding a study program.
 * @param root The root object.
 * @param root.openModal The openModal flag.
 * @param root.onClose The onClose function.
 * @param root.educationInstitution The education institution object.
 * @returns A page to add a study program.
 */
export default function AddStudyProgram({
  openModal,
  onClose,
  educationInstitution,
}: Readonly<Props>) {
  const [name, setName] = useState("");
  const [studyPrograms, setStudyPrograms] = useState([]);
  const [educationInstitutions, setEducationInstitutions] = useState<
    EducationInstitution[]
  >([]);
  const [educationInstitutionID, setEducationInstitutionID] = useState<number>(
    educationInstitution?.id || null,
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  type EducationInstitution = {
    name: string;
    id: number;
  };

  useEffect(() => {
    if (
      name.trim() === "" ||
      educationInstitutionID === null ||
      studyPrograms.some(
        (sp) => sp.name === name.trim() && sp.eduID === educationInstitutionID,
      )
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [name, studyPrograms, educationInstitutionID]);

  useEffect(() => {
    fetchStudyPrograms()
      .then((data) => {
        setStudyPrograms(data);
      })
      .catch((error) => console.error("Failed to fetch Study Programs", error));
  }, []);

  useEffect(() => {
    fetchEducationInstitutions()
      .then((data) => {
        setEducationInstitutions(data);
      })
      .catch((error) =>
        console.error("Failed to fetch Education Institutions", error),
      );
  }, []);

  /**
   * The handleSubmit function adds a new study program.
   * @param event The event object.
   * If the educationInstitutionID is null, the function returns.
   * The data object contains the name and educationInstitutionID of the study program.
   * The addStudyProgram function is called with the data object.
   * The isModalVisible state is set to true.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (educationInstitutionID === null) {
      return;
    }
    const data = {
      name: name.trim(),
      educationInstitutionID: educationInstitutionID,
    };

    await addStudyProgram(data);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" />
      <dialog
        open={openModal === true}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="flex flex-col justify-center items-center h-fit w-full">
          <ContainerBox className="items-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5  items-center justify-center"
            >
              <h1 className="flex justify-center text-4xl font-bold">
                Add Study Program
              </h1>

              <input
                type="text"
                placeholder="Study Program Name"
                className="input input-bordered text-base-content"
                onChange={(e) => setName(e.target.value)}
                defaultValue={name}
                maxLength={255}
                aria-label="Set study Program Name"
                required
              />
              {!educationInstitutionID ? (
                <EduInstitutionDropdown
                  educationInstitutionID={educationInstitutionID}
                  educationInstitutions={educationInstitutions}
                  setEducationInstitutionID={setEducationInstitutionID}
                />
              ) : null}

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
