"use client";

import { useEffect, useState } from "react";
import {
  createEmployee,
  fetchEmployees,
} from "../../[lang]/(pages)/users/add/action";
import ContainerBox from "@/app/components/ContainerBox";

type Props = {
  openModal: boolean;
  onClose: () => void;
};

export default function AddEmployee({ openModal, onClose }: Readonly<Props>) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [employees, setEmployees] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      employees.some((emp) => emp.email === email.trim())
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [firstName, lastName, email, employees]);

  useEffect(() => {
    fetchEmployees()
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => console.error("Failed to fetch Employees", error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: `${firstName} ${lastName}`,
      email: email.trim(),
      role: "user",
      password: "password",
    };

    await createEmployee(data);
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
                Add user
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
