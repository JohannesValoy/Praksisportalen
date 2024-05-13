"use client";
import { useState } from "react";
import EditModal from "./EditModal";

type Props = {
  user: any;
};
/**
 * Creates a modal to edit a user.
 * @param root The root object.
 * @param root.user The user object.
 * @returns A modal to edit a user.
 */
export default function EditUser({ user }: Readonly<Props>) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateName = name.trim();
    const updateEmail = email.trim();

    const update: {
      name?: string;
      email?: string;
    } = {};

    if (updateName) {
      update.name = updateName;
    }
    if (updateEmail) {
      update.email = updateEmail;
    }

    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} aria-label="Edit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      <dialog open={showModal === true} className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between w-full">
            <h2 className="font-bold text-lg">Edit</h2>
            <button
              onClick={() => setShowModal(false)}
              type="button"
              className="btn btn-error btn-sm btn-circle"
            >
              x
            </button>
          </div>
          <EditModal
            name={user.name}
            setName={setName}
            handleSubmit={handleSubmit}
            disabled={name === user.name && email === user.email}
          >
            <div className="w-full">
              <div className="label">
                <span className="label-text text-neutral-content">Email</span>
              </div>
              <input
                type="email"
                placeholder={email}
                className="input input-bordered text-base-content w-full"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                maxLength={255}
                aria-label="Set email"
              />
            </div>
          </EditModal>
        </div>
      </dialog>
    </>
  );
}
