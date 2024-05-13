"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SuccessDialog from "@/app/_components/Modals/SuccessAddDialog";
import ContainerBox from "@/app/_components/ContainerBox";
import { createStudent } from "../../add/action";
import Dropdown from "@/app/_components/Dropdowns/Dropdown";

type Props = {
  wordbook: { [key: string]: string };
  user: any;
  educationInstitutions: EducationInstitution[];
};

type EducationInstitution = {
  id: number;
  name: string;
};

/**
 * Creates a page that allows for adding a student.
 * @param root The root object.
 * @param root.wordbook The wordbook object containing all the translations.
 * @param root.user The user object.
 * @param root.educationInstitutions The education institutions object.
 * @returns A page to add a student.
 */
export default function AddStudentPage({
  wordbook,
  user,
  educationInstitutions,
}: Readonly<Props>) {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [educationInstitutionID, setEducationInstitutionID] = useState(
    user.educationInstitutionID || null,
  );
  console.log(user.educationInstitutionID);

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
      setIsModalVisible(true);
    } catch (error) {
      const errorMessage = error.message;
      const userFriendlyMessage = errorMessage.split("-").pop().trim();
      window.alert(userFriendlyMessage);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-fit w-full">
      <SuccessDialog isModalVisible={isModalVisible} />
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
                  <span className="label-text text-neutral-content">Email</span>
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
          {user.role && user.role === "admin" ? (
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
            <button
              type="button"
              className="btn w-20"
              onClick={() => router.back()}
            >
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
  );
}
