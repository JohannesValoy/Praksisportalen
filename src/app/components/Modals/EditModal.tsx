import React from "react";

interface EditModalProps {
  setName: (name: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  children?: React.ReactNode;
  disabled: boolean;
}

const EditModal: React.FC<EditModalProps> = ({
  setName,
  handleSubmit,
  children,
  disabled,
}) => {
  return (
    <div className="modal-action">
      <form className="w-full" method="dialog" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center w-full gap-6">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              type="name"
              placeholder="name"
              className="input input-bordered text-base-content"
              onChange={(e) => setName(e.target.value.trim())}
              maxLength={255}
              aria-label="Set first name"
            />
          </label>

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
