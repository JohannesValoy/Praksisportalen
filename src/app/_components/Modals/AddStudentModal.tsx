"use client";

import { useEffect, useState } from "react";
import ContainerBox from "@/app/_components/ContainerBox";
import { createStudent } from "../../[lang]/(pages)/users/add/action";
import Dropdown from "@/app/_components/Dropdowns/Dropdown";

type Props = {
  wordbook?: { [key: string]: string };
  eduInstitutionID?: number;
  educationInstitutions?: EducationInstitution[];
  openModal: boolean;
  onClose: () => void;
};

type EducationInstitution = {
  id: number;
  name: string;
};

/**
 * Creates a page that allows for adding a student.
 * @param root The root object.
 * @param root.wordbook The wordbook object containing all the translations.
 * @param root.eduInstitutionID The education institution ID.
 * @param root.educationInstitutions The education institutions object.
 * @param root.openModal The openModal flag.
 * @param root.onClose The onClose function.
 * @returns A page to add a student.
 */
export default function AddStudentModal({
  wordbook,
  eduInstitutionID,
  educationInstitutions,
  openModal,
  onClose,
}: Readonly<Props>) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [educationInstitutionID, setEducationInstitutionID] = useState(
    eduInstitutionID || null,
  );

  useEffect(() => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      !educationInstitutionID
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [firstName, lastName, email, educationInstitutionID]);

  /**
   * The handleSubmit function adds a new student.
   * @param event The event object.
   * @returns A modal to confirm the addition of the student.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: `${firstName} ${lastName}`,
      email: email.trim(),
      educationInstitutionID: educationInstitutionID,
    };
    try {
      await createStudent(data);
      onClose();
    } catch (error) {
      window.alert("Invalid email address. Please try again.");
    }
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
                Add Student
              </h1>
              <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4">
                  <label className="form-control w-full ">
                    <div className="label">
                      <span className="label-text text-neutral-content">
                        First Name
                      </span>
                    </div>
                    <input
                      type="name"
                      placeholder="First Name"
                      className="input input-bordered text-base-content w-full"
                      onChange={(e) => setFirstName(e.target.value)}
                      maxLength={255}
                      aria-label="Set first name"
                      required
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-neutral-content">
                        Last Name
                      </span>
                    </div>
                    <input
                      type="name"
                      placeholder="Last Name"
                      className="input input-bordered text-base-content w-full"
                      onChange={(e) => setLastName(e.target.value)}
                      maxLength={255}
                      aria-label="Set last name"
                      required
                    />
                  </label>
                </div>
                <div className="flex flex-row gap-4">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-neutral-content">
                        Email
                      </span>
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="input input-bordered text-base-content w-full"
                      onChange={(e) => setEmail(e.target.value)}
                      aria-label="Set email"
                      required
                    />
                  </label>
                </div>
              </div>
              {!eduInstitutionID ? (
                <Dropdown
                  dropdownName="Education Institution"
                  options={educationInstitutions}
                  selectedOption={
                    educationInstitutions.find(
                      (edu) => edu.id === educationInstitutionID,
                    ) || null
                  }
                  setSelectedOption={(edu) =>
                    setEducationInstitutionID(edu.id as number)
                  }
                  onSearchChange={() => {
                    setEducationInstitutionID(null);
                  }}
                  renderOption={(edu) => <>{edu.name}</>}
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
