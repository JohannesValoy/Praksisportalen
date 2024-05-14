import React, { useCallback, useEffect, useState } from "react";
import { Order, paginateInternships, saveOrderDistribution } from "./actions";
import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";

interface InternshipDistributionModalProps {
  selectedOrder: Order;
  closeModal: () => void;
  setError: (message: string) => void;
}

const InternshipDistributionModal: React.FC<
  InternshipDistributionModalProps
> = ({ selectedOrder, closeModal, setError }) => {
  const [rows, setRows] = useState([]);
  const [sortedBy, setSortedBy] = useState<string>("vacancies");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [studentsLeft, setStudentsLeft] = useState(0);
  const [allRowAmounts, setAllRowAmounts] = useState<{}>({});
  const [inputErrors, setInputErrors] = useState({});

  const handleError = useCallback(
    (message) => {
      setError(message);
    },
    [setError]
  );

  const fetchInternships = useCallback(async () => {
    if (!selectedOrder) return;

    const params: InternshipPaginationRequest = {
      page,
      size: 5,
      sort: sortedBy,
      vacancyStartDate: selectedOrder.startWeek,
      vacancyEndDate: selectedOrder.endWeek,
      field: selectedOrder.internshipField,
      yearOfStudy: [selectedOrder.studyYear],
    };

    const data = await paginateInternships(params);
    setRows(data.elements || []);
    setTotalPages(data.totalPages || 0);
  }, [selectedOrder, page, sortedBy]);

  useEffect(() => {
    fetchInternships();
    if (selectedOrder) {
      const totalSelected = Object.values(allRowAmounts).reduce(
        (sum: number, amount: number) => sum + amount,
        0
      );

      setStudentsLeft(
        selectedOrder.numStudents -
          selectedOrder.numStudentsAccepted -
          totalSelected
      );

      setInputErrors({});
      setError(null);
    }
  }, [selectedOrder, fetchInternships, allRowAmounts, setError]);

  const handleAmountChange = (row, amount) => {
    const newErrors = { ...inputErrors };

    // If it is a invalid number
    if (amount < 0 || amount > row.vacancies || amount > studentsLeft) {
      //Log a error within that row
      newErrors[row.id] =
        `Amount must be between 0 and ${Math.min(row.vacancies, studentsLeft)}`;
      //Set and render
      setInputErrors(newErrors);
      //Quit function
      return;
      //Else if it is a null, 0 or ""
    } else if (!amount) {
      //Set it to be zero
      amount = 0;
    }

    //Modifies the row amount
    setAllRowAmounts((newAmounts) => {
      return {
        ...newAmounts,
        [row.id]: amount,
      };
    });
    setInputErrors((oldNewErrors) => delete oldNewErrors[row.id]);
  };

  const saveRows = async () => {
    try {
      const savePromises = Object.keys(allRowAmounts).flatMap((id) => {
        return saveDistribution(
          selectedOrder.id,
          parseInt(id),
          allRowAmounts[id]
        );
      });
      await Promise.all(savePromises);
      closeModal();
    } catch (error) {
      handleError(
        `An error occurred while saving distributions: ${error.message}`
      );
    }
  };

  const saveDistribution = async (subFieldGroupID, InternshipID, amount) => {
    try {
      await saveOrderDistribution(subFieldGroupID, InternshipID, amount);
    } catch (error) {
      handleError(
        "An error occurred while saving the distribution: " + error.message
      );
    }
  };

  return (
    <>
      <button
        aria-label="Close modal"
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={closeModal}
      />
      <div
        onSubmit={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50 h-fit w-fit mx-auto my-auto p-1 m-1"
        aria-label="Internship Distribution Modal"
      >
        <div className="flex flex-col bg-base-100 rounded-xl shadow-lg max-w-4xl w-full mx-auto p-2 md:p-8 gap-5">
          <div className="flex gap-2 items-center justify-center w-full text-center">
            Study Program:
            <div className="text-primary font-bold">
              {selectedOrder?.studyProgram.name}
            </div>
          </div>
          <div className="flex flex-col gap-5 text-center justify-center text-base-content w-full">
            <div
              className="flex gap-2 mx-auto"
              aria-label="Internship date range"
            >
              Period:
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
                  <th aria-label="Sort by name">
                    <input
                      type="button"
                      onClick={() => setSortedBy("name")}
                      className="btn btn-ghost btn-sm"
                      value="Name"
                    />
                  </th>
                  <th aria-label="Sort by current capacity">
                    <input
                      type="button"
                      onClick={() => setSortedBy("currentCapacity")}
                      className="btn btn-ghost btn-sm"
                      value="Capacity"
                    />
                  </th>
                  <th aria-label="Sort by vacancies">
                    <input
                      type="button"
                      onClick={() => setSortedBy("vacancies")}
                      className="btn btn-ghost btn-sm"
                      value="Vacancies"
                    />
                  </th>
                  <th>Students to Assign</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-base-300 cursor-pointer rounded-lg"
                    aria-label="Internship row"
                  >
                    <td>{row.name}</td>
                    <td>{row.currentCapacity}</td>
                    <td>{row.vacancies}</td>
                    <td className="flex flex-col gap-2">
                      <input
                        type="number"
                        min="0"
                        max={Math.min(row.vacancies, studentsLeft)}
                        value={allRowAmounts[row.id] || ""}
                        disabled={row.vacancies == 0}
                        onChange={(e) =>
                          handleAmountChange(row, parseInt(e.target.value))
                        }
                        className={`input input-bordered input-sm ${inputErrors[row.id] ? "input-error" : ""}`}
                        aria-label="Amount to assign"
                      />
                      {inputErrors[row.id] && (
                        <span className="text-red-500 text-xs">
                          {inputErrors[row.id]}
                        </span>
                      )}
                    </td>
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
            <div className="join">
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
                    d="m5.25 4.5 7.5 7.5-7.5 7.5"
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
                className="btn btn-accent"
                onClick={saveRows}
                disabled={studentsLeft === selectedOrder.numStudents}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternshipDistributionModal;
