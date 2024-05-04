import Link from "next/link";

/**
 * The SuccessDialog component displays a modal to confirm the addition of an item.
 * @param isModalVisible A boolean that determines if the modal is visible.
 * @returns A modal to confirm the addition of an item.
 */
export default function SuccessDialog({ isModalVisible }) {
  /**
   * The refreshPage function reloads the page.
   * @returns A reloaded page.
   */
  function refreshPage() {
    window.location.reload();
  }

  return (
    <dialog
      open={isModalVisible === true}
      className="modal  modal-bottom sm:modal-middle"
    >
      <div className="bg-base-300 text-base-content modal-box">
        <h3 className="font-bold text-lg">Great!</h3>
        <p className="py-4">Successfully added!</p>
        <div className="modal-action">
          <Link href="/" className="btn  rounded-btn h-full">
            Home
          </Link>
          <button
            onClick={refreshPage}
            className="btn btn-accent rounded-btn h-full"
          >
            Add another one
          </button>
        </div>
      </div>
    </dialog>
  );
}
