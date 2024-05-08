"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createCoordinator, createStudent } from "./action";
import SuccessDialog from "@/app/_components/Modals/SuccessAddDialog";
import ContainerBox from "@/app/_components/ContainerBox";
import { createEmployee, generatePassword } from "@/services/EmployeeService";
import Dropdown from "@/app/_components/Dropdowns/Dropdown";
import { fetchEducationInstitutions } from "../../studyprograms/add/action";

type Props = {
  wordbook: { [key: string]: string };
};

/**
 * Creates a page that allows for adding a user.
 * @param root The root object.
 * @param root.wordbook The wordbook object containing all the translations.
 * @returns A page to add a user.
 */
export default function AddUserPage({ wordbook }: Readonly<Props>) {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [role, setRole] = useState("user");

  const [educationInstitutions, setEducationInstitutions] = useState<
    EducationInstitution[]
  >([]);
  const [educationInstitutionID, setEducationInstitutionID] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const password = generatePassword(8);

  type EducationInstitution = {
    id: number;
    name: string;
  };

  useEffect(() => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      ((role === "coordinator" || role === "student") &&
        educationInstitutionID === null)
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [firstName, lastName, email, role, educationInstitutionID]);

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
   * The handleSubmit function adds a new user.
   * @param event The event object.
   * If the role is coordinator, the coordinator object is created and added to the database.
   * If the role is student, the student object is created and added to the database.
   * If the role is employee, the employee object is created and added to the database.
   * The isModalVisible state is set to true.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (role === "coordinator") {
        const data = {
          name: `${firstName} ${lastName}`,
          email: email.trim(),
          password: password.toString(),
          educationInstitutionID: educationInstitutionID,
        };

        await createCoordinator(data);

        setIsModalVisible(true);
      }

      if (role === "student") {
        const data = {
          name: `${firstName} ${lastName}`,
          email: email.trim(),
          educationInstitutionID: educationInstitutionID,
        };

        await createStudent(data);
        setIsModalVisible(true);
      }

      if (role === "user" || role === "admin") {
        const data = {
          name: `${firstName} ${lastName}`,
          email: email.trim(),
          role: role,
          password: password.toString(),
        };

        await createEmployee(data);

        setIsModalVisible(true);
      }
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
          <h1 className="flex justify-center text-4xl font-bold">Add user</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="name"
                  placeholder="First Name"
                  className="input input-bordered w-full text-base-content"
                  onChange={(e) => setFirstName(e.target.value)}
                  maxLength={255}
                  aria-label="Set first name"
                  required
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="name"
                  placeholder="Last Name"
                  className="input input-bordered w-full text-base-content"
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
                  <span className="label-text">Email</span>
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
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Role</span>
                </div>
                <select
                  className="select select-bordered w-full"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  aria-label="Select role"
                  required
                >
                  <option value="user">Employee</option>
                  <option value="coordinator">Coordinator</option>
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
            </div>
          </div>
          {role && (role === "coordinator" || role === "student") ? (
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
