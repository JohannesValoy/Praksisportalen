"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createCoordinator, createStudent } from "./action";
import SuccessDialog from "@/app/_components/Modals/SuccessAddDialog";
import ContainerBox from "@/app/_components/ContainerBox";
import { createEmployee } from "@/services/EmployeeService";
import EduInstitutionDropdown from "@/app/_components/Dropdowns/EduInstitutionDropdown";

type Props = {
  wordbook: { [key: string]: string };
  educationInstitutions: EducationInstitution[];
};

type EducationInstitution = {
  id: number;
  name: string;
};

/**
 * Creates a page that allows for adding a user.
 * @param root The root object.
 * @param root.wordbook The wordbook object containing all the translations.
 * @param root.educationInstitutions The education institutions object.
 * @returns A page to add a user.
 */
export default function AddUserPage({
  wordbook,
  educationInstitutions,
}: Readonly<Props>) {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [role, setRole] = useState("user");

  const [educationInstitutionID, setEducationInstitutionID] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          password: password,
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
          password: password,
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
                  <span className="label-text text-neutral-content">
                    First Name
                  </span>
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
                  <span className="label-text text-neutral-content">
                    Last Name
                  </span>
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
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-neutral-content">Role</span>
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
            <EduInstitutionDropdown
              educationInstitutionID={educationInstitutionID}
              educationInstitutions={educationInstitutions}
              setEducationInstitutionID={setEducationInstitutionID}
            />
          ) : null}
          {role && role !== "student" ? (
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-neutral-content">
                  Password
                </span>
              </div>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered text-base-content w-full"
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Set password"
                maxLength={255}
                required
              />
            </label>
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
