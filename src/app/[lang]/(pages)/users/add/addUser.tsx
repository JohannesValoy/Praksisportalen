"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createCoordinator, createEmployee, createStudent } from "./action";
import SuccessDialog from "@/app/components/SuccessDialog";
import ContainerBox from "@/app/components/ContainerBox";
import { generatePassword } from "@/services/EmployeeService";

type Props = {
  wordbook: { [key: string]: string };
  employees: any;
  coordinators: any;
  students: any;
};

/**
 * Creates a page that allows for adding a user.
 * @returns A page to add a user.
 */
export default function AddUserPage({
  wordbook,
  employees,
  coordinators,
  students,
}: Readonly<Props>) {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [role, setRole] = useState("user");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const password = generatePassword(8);

  useEffect(() => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      employees.some((emp) => emp.email === email.trim()) ||
      coordinators.some((coordinator) => coordinator.email === email.trim()) ||
      students.some((student) => student.email === email.trim())
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [firstName, lastName, email, employees, coordinators, students]);

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

    if (role === "coordinator") {
      const data = {
        name: `${firstName} ${lastName}`,
        email: email.trim(),
        password: password,
      };

      await createCoordinator(data);

      setIsModalVisible(true);
    }

    if (role === "student") {
      const data = {
        name: `${firstName} ${lastName}`,
        email: email.trim(),
      };

      await createStudent(data);
      setIsModalVisible(true);
    }

    const data = {
      name: `${firstName} ${lastName}`,
      email: email.trim(),
      role: role,
      password: password,
    };

    await createEmployee(data);

    setIsModalVisible(true);
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
