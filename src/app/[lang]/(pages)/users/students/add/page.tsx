"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SuccessDialog from "@/app/components/SuccessDialog";
import ContainerBox from "@/app/components/ContainerBox";
import { createStudent, fetchStudentsEmail } from "../../add/action";

/**
 * Creates a page that allows for adding a student.
 * @returns A page to add a student.
 */
export default function Page() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [students, setStudents] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      students.some((student) => student.email === email.trim())
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [firstName, lastName, email, students]);

  useEffect(() => {
    fetchStudentsEmail()
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => console.error("Failed to fetch Students", error));
  }, []);

  /**
   * The handleSubmit function adds a new student.
   * @param event The event object.
   * @returns A new student.
   * @returns A modal to confirm the addition of the student.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: `${firstName} ${lastName}`,
      email: email.trim(),
      password: password.trim(),
    };

    await createStudent(data);

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
          <h1 className="flex justify-center text-4xl font-bold">
            Add Student
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">First Name</span>
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
                  <span className="label-text">Last Name</span>
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
                  <span className="label-text">Password</span>
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
