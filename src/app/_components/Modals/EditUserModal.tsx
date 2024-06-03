"use client";
import { useState } from "react";
import EditModal from "./EditModal";
import { PencilIcon } from "@heroicons/react/24/outline";
import { updateUserDetails } from "@/app/[lang]/(pages)/profile/[id]/action";
import { Role } from "@/app/api/auth/[...nextauth]/nextauth";

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
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateName = name.trim();
    const updateEmail = email.trim();

    const update: {
      name?: string;
      email?: string;
      password?: string;
    } = {};

    if (updateName) {
      update.name = updateName;
    }
    if (updateEmail) {
      update.email = updateEmail;
    }
    if (password) {
      update.password = password;
    }

    updateUserDetails(
      user,
      update,
      window.location.href.split(window.location.hostname)[1],
    );
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} aria-label="Edit">
        <PencilIcon className="w-6 h-6" />
      </button>
      <dialog open={showModal} className="modal">
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
            disabled={name === user.name && email === user.email && !password}
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
            {user.role !== Role.student && (
              <div className="w-full">
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
                />
              </div>
            )}
          </EditModal>
        </div>
      </dialog>
    </>
  );
}
