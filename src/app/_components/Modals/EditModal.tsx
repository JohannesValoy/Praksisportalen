import React from "react";

/**
 * The EditModalProps interface represents the props of the EditModal component.
 */
interface EditModalProps {
  name: string;
  setName: (name: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

/**
 * The EditModal component is a reusable edit modal component.
 * @param root The root object.
 * @param root.name The name of the component.
 * @param root.setName The function to set the name.
 * @param root.handleSubmit The function to handle the submit event.
 * @param root.children The children elements.
 * @param root.disabled The disabled flag.
 * @returns An edit modal component.
 */
const EditModal: React.FC<EditModalProps> = ({
  name,
  setName,
  handleSubmit,
  children,
  disabled,
}) => {
  return (
    <div className="modal-action">
      <form className="w-full" method="dialog" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center w-full gap-6">
          <input
            type="name"
            placeholder={name}
            className="input input-bordered text-base-content w-full"
            defaultValue={name}
            onChange={(e) => setName(e.target.value.trim())}
            maxLength={255}
            aria-label="Set first name"
          />

          {children}

          <div className="flex flex-row justify-end w-full">
            <button
              type="submit"
              className="btn btn-accent"
              disabled={disabled}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
