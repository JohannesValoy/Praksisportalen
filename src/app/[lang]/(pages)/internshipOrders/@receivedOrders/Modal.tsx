import React, { useCallback, useEffect, useState } from "react";
import { Order, paginateInternships, saveOrderDistribution } from "./actions";
import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";
import ErrorModal from "@/app/components/ErrorModal";

interface InternshipDistributionModalProps {
  selectedOrder: Order;
  closeModal: () => void;
}

const InternshipDistributionModal: React.FC<
  InternshipDistributionModalProps
> = ({ selectedOrder, closeModal}) => {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortedBy, setSortedBy] = useState<string>("name");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [studentsLeft, setStudentsLeft] = useState(0);
  const [error, setError] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const fetchInternships = useCallback(() => {
    if (!selectedOrder) return;

    const params: InternshipPaginationRequest = {
      page,
      size: 5,
      sort: sortedBy,
      vacancyStartDate: selectedOrder.startWeek,
      vacancyEndDate: selectedOrder.endWeek,
      field: selectedOrder.internshipField,
    };
    paginateInternships(params)
      .then((data) => {
        setRows(data.elements || []);
        setTotalPages(data.totalPages || 0);
      })
      .catch((error) => {
        setError("Failed to fetch internships: " + error.message);
        setIsErrorModalOpen(true);
      });
  }, [page, sortedBy, selectedOrder]);

  useEffect(() => {
    if (selectedOrder) {
      fetchInternships();
      setStudentsLeft(
        selectedOrder.numStudents - selectedOrder.numStudentsAccepted
      );
      setSelectedRows([]);
      setError(null);
    }
  }, [selectedOrder, fetchInternships]);
  const toggleSelection = (row) => {
    // Ignore selection if the internship has no free spots left
    if (row.vacancies <= 0) return;

    let currentIndex = selectedRows.indexOf(row);
    let newSelectedRows = [...selectedRows];

    if (currentIndex !== -1) {
      newSelectedRows.splice(currentIndex, 1); // Remove the row from selection
    } else {
      newSelectedRows.push(row); // Add the row to selection
    }

    // Recalculate vacanciesSelected with the updated newSelectedRows, only counting rows with free spots
    let vacanciesSelected = newSelectedRows.reduce((total, row) => {
      return row.vacancies > 0 ? total + row.vacancies : total;
    }, 0);

    setSelectedRows(newSelectedRows);
    setStudentsLeft(
      Math.max(
        0,
        selectedOrder.numStudents -
          selectedOrder.numStudentsAccepted -
          vacanciesSelected
      )
    ); // Ensure it never goes negative
    if (vacanciesSelected < 0) {
      throw new Error("Vacancies selected is negative: " + vacanciesSelected);
    }
  };

  /**
   * Save the distribution of students to internships.
   */
  //TODO THIS SHOULD BE DONE IN A BATCH BUT IS NOT CHANGED DO TO TIME CONSTRAINTS
  function saveRows() {
    let numDoneStudents = 0;

    let amount = selectedOrder.numStudents - selectedOrder.numStudentsAccepted;
    selectedRows.forEach((selectedRow) => {
      if (amount <= 0) {
        return;
      }

      saveDistribution(
        selectedOrder.id,
        selectedRow.id,
        Math.min(amount - numDoneStudents, selectedRow.vacancies)
      );
      numDoneStudents = numDoneStudents + selectedRow.vacancies;
    });
  }

  //TODO make it save even with only status
  /**
   * Save the distribution of students to internships.
   * @param subFieldGroupID The ID of the subFieldGroup to distribute students to.
   * @param InternshipID The ID of the internship to distribute students to.
   * @param amount The amount of students to distribute.
   */
  function saveDistribution(subFieldGroupID, InternshipID, amount) {
    saveOrderDistribution(subFieldGroupID, InternshipID, amount)
      .then(() => {
        closeModal()// Show success modal
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to save distribution: " + error.message);
        setIsErrorModalOpen(true); // Show error modal
      });
  }
  return (
    <>
      <button
        aria-label="Close modal"
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={closeModal}
      ></button>
      <div
        onSubmit={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50 h-fit w-fit mx-auto my-auto p-1 m-1"
        aria-label="Internship Distribution Modal"
      >
        <div className="flex flex-col bg-base-100 rounded-xl shadow-lg max-w-4xl w-full mx-auto p-2 md:p-8 gap-5">
          <h1 className="text-3xl font-bold text-center text-primary">
            {selectedOrder?.studyProgram.name}
          </h1>
          <div className="flex flex-col gap-5 text-center justify-center text-base-content w-full">
            <div
              className="flex gap-2 mx-auto"
              aria-label="Internship date range"
            >
              Date:
              <div className="text-primary font-bold">
                {selectedOrder?.startWeek.toISOString().split("T")[0]}
              </div>
              -
              <div className="text-primary font-bold">
                {selectedOrder?.endWeek.toISOString().split("T")[0]}
              </div>
            </div>

            <div className="mx-auto" aria-label="Internship details">
              <div className="flex gap-2">
                School:
                <div className="font-bold text-primary">
                  {selectedOrder.studyProgram.educationInstitute.name}
                </div>
                Field:
                <div className="font-bold text-primary">
                  {selectedOrder.internshipField}
                </div>
                Year:
                <div className="font-bold text-primary">
                  {selectedOrder.studyYear}
                </div>
              </div>
            </div>

            <div className="mx-auto" aria-label="Students left to assign">
              <div className="flex gap-2">
                Students left to assign:
                <div className="font-bold text-primary">{studentsLeft}</div>/
                <div className="font-bold text-primary">
                  {selectedOrder?.numStudents}
                </div>
              </div>
            </div>
          </div>
          {selectedOrder?.comment && (
            <div className="chat chat-start">
              <div
                className="chat-bubble text-neutral-content bg-neutral"
                aria-label="Order comment"
              >
                {selectedOrder.comment}
              </div>
            </div>
          )}
          <div className="overflow-x-auto" aria-label="Selection table">
            <table className="table w-full text-sm card-body overflow-hidden flex items-center justify-center text-center">
              <thead>
                <tr className="text-xs uppercase bg-base-200 text-base-content">
                  <td></td>
                  <th aria-label="Sort by name">
                    <input
                      type="button"
                      onClick={() => setSortedBy("name")}
                      className="btn btn-ghost btn-sm"
                      value="Navn"
                    />
                  </th>
                  <th aria-label="Sort by current capacity">
                    <input
                      type="button"
                      onClick={() => setSortedBy("currentCapacity")}
                      className="btn btn-ghost btn-sm"
                      value="Kapasitet"
                    />
                  </th>
                  <th aria-label="Sort by vacancies">
                    <input
                      type="button"
                      onClick={() => setSortedBy("vacancies")}
                      className="btn btn-ghost btn-sm"
                      value="Ledig"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`${selectedRows.includes(row) ? "bg-neutral text-neutral-content" : "hover:bg-base-300 "} cursor-pointer rounded-lg`}
                    onClick={() => row.vacancies > 0 && toggleSelection(row)}
                    aria-label="Internship row"
                  >
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={selectedRows.includes(row)}
                        onChange={() =>
                          row.vacancies > 0 && toggleSelection(row)
                        }
                        disabled={row.vacancies <= 0}
                        aria-label="Select row"
                      />
                    </td>
                    <td>{row.name}</td>
                    <td>{row.currentCapacity}</td>
                    <td>{row.vacancies}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-base-content">
                      No available spots found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div
            className="pagination flex flex-wrap justify-between items-center my-4 gap-2"
            aria-label="Pagination controls"
          >
            <div className="join ">
              <button
                className="btn btn-ghost join-item"
                onClick={() => setPage(0)}
                disabled={page === 0}
                aria-label="Go to first page"
              >
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
                    d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                  />
                </svg>
              </button>
              <button
                className="btn btn-ghost join-item"
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                aria-label="Go to previous page"
              >
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
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <span
                className="font-semibold join-item p-2 text-neutral-content bg-neutral text-center flex items-center"
                aria-label="Current page and total pages"
              >
                {page + 1} / {totalPages}
              </span>
              <button
                className="flex flex-nowrap btn btn-ghost join-item w-fit"
                onClick={() => setPage(page + 1)}
                disabled={page + 1 >= totalPages}
                aria-label="Go to next page"
              >
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
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
              <button
                className="btn btn-ghost join-item"
                onClick={() => setPage(totalPages - 1)}
                disabled={page + 1 >= totalPages}
                aria-label="Go to last page"
              >
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
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>

            <div className="">
              <button
                className="btn btn-neutral mr-2"
                onClick={() => closeModal()}
              >
                Close
              </button>
              <button
                className="btn btn-success"
                onClick={() => {
                  closeModal();
                  saveRows();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {isErrorModalOpen && (
        <ErrorModal message={error} setIsModalOpen={setIsErrorModalOpen} />
      )}
    </>
  );
};

export default InternshipDistributionModal;
