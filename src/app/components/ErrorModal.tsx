/**
 * ErrorModal component
 * @param root0 The props passed to the component.
 * @param root0.message The message to display in the modal.
 * @param root0.setIsModalOpen A function to set the state of the modal (true/false).
 * @returns JSX.Element
 */
export default function ErrorModal({ message, setIsModalOpen }) {
  return (
    <dialog
      className="fixed inset-0 z-10 overflow-y-auto bg-base-300 rounded-lg"
      open
      aria-labelledby={"Error: " + message}
    >
      <div className="px-4 pt-5 pb-4 ">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-error sm:mx-0 sm:h-10 sm:w-10">
            {/* Icon or image can be added here */}
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-lg leading-6 font-medium text-base-content"
              id="Error"
            >
              Error
            </h3>
            <div className="mt-2">
              <p className="text-sm text-base-content">{message}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="btn btn-info"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
      </div>
    </dialog>
  );
}
