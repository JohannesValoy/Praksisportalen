"use client";

import { useEffect, useState } from "react";
import ContainerBox from "@/app/_components/ContainerBox";
import { generatePassword } from "@/lib/tools";
import { IconArrowsShuffle } from "@tabler/icons-react";
import { createEmployee } from "@/services/EmployeeService";

type Props = {
  onClose: () => void;
};

/**
 * The AddEmployee component displays a form to add an employee.
 * @param root The root object.
 * @param root.onClose The onClose function.
 * @returns A form to add an employee.
 */
export default function AddEmployee({ onClose }: Readonly<Props>) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === ""
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [firstName, lastName, email]);

  /**
   * The handleSubmit function adds a new employee.
   * @param event The event object.
   * @returns A new employee.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: `${firstName} ${lastName}`,
      email: email.trim(),
      role: "user",
      password: password,
    };
    try {
      await createEmployee(data);
      onClose();
    } catch (error) {
      window.alert("Invalid email address. Please try again.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" />
      <dialog open={true} className="modal modal-bottom sm:modal-middle">
        <div className="flex flex-col justify-center items-center h-fit w-full">
          <ContainerBox className="items-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5  items-center justify-center"
            >
              <h1 className="flex justify-center text-4xl font-bold">
                Add Employee
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
                  <div className="flex flex-row items-center relative">
                    <input
                      type="text"
                      placeholder="Enter password"
                      className="input input-bordered text-base-content w-full"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-label="Set password"
                      required
                    />
                    <IconArrowsShuffle
                      type="button"
                      className="absolute right-2 btn btn-ghost btn-circle btn-xs"
                      onClick={() =>
                        setPassword(generatePassword(8).toString())
                      }
                    />
                  </div>
                </label>
              </div>

              <div className="flex flex-row gap-5 justify-between w-full">
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
