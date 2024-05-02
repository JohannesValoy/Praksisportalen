/** @format */

import React from "react";
import { Order } from "./actions";

interface InternshipDistributionModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
  selectedOrder: Order;
  rows: any[]; // replace with the actual type
  setSortedBy: (sortedBy: any) => void; // replace with the actual type
  selectedRows: any[]; // replace with the actual type
  toggleSelection: (selection: any) => void; // replace with the actual type
  studentsLeft: number;
  saveDistribution(arg1, arg2, arg3);
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  closeModal: () => void;
  setStatus: (status: "Finalized" | "Pending") => void;
}

const InternshipDistributionModal: React.FC<
  InternshipDistributionModalProps
> = ({
  setIsModalOpen,
  selectedOrder,
  rows,
  setSortedBy,
  selectedRows,
  toggleSelection,
  studentsLeft,
  saveDistribution,
  page,
  setPage,
  totalPages,
  closeModal,
  setStatus,
}) => {
  return (
    <>
      <button
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={() => setIsModalOpen(false)}
      ></button>
      <div
        onSubmit={() => setIsModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-50 h-fit w-fit mx-auto my-auto p-1 m-1"
        aria-label="Internship Distribution Modal"
      >
        <div className="flex flex-col bg-base-100 rounded-xl shadow-lg max-w-4xl w-full mx-auto p-2 md:p-8 gap-5">
          <h1 className="text-3xl font-bold text-center text-primary">
            {selectedOrder?.studyProgram.name}
          </h1>
          <div className="flex flex-col gap-5 text-center justify-center  text-base-content w-full">
            <div className="flex gap-2 mx-auto">
              Date:
              <div className="text-primary font-bold">
                {selectedOrder?.startWeek.toISOString().split("T")[0]}
              </div>
              /
              <div className="text-primary font-bold">
                {selectedOrder?.endWeek.toISOString().split("T")[0]}
              </div>
            </div>
            <div className="mx-auto">
              <div className="flex gap-2">
                Students left to assign:{" "}
                <div className="font-bold text-primary">{studentsLeft}</div>/
                <div className="font-bold text-primary">
                  {selectedOrder?.numStudents}
                </div>
              </div>
            </div>
          </div>
          <div className="chat chat-start">
            <div className="chat-bubble text-neutral-content bg-neutral">
              {selectedOrder?.comment}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm card-body overflow-hidden flex items-center justify-center text-center">
              <thead>
                <tr className="text-xs uppercase bg-base-200 text-base-content">
                  <td></td>
                  <th>
                    <input
                      type="button"
                      onClick={() => setSortedBy("name")}
                      className="btn btn-ghost btn-sm"
                      value="Navn"
                    />
                  </th>
                  <th>
                    <input
                      type="button"
                      onClick={() => setSortedBy("currentCapacity")}
                      className="btn btn-ghost btn-sm"
                      value="Kapasitet"
                    />
                  </th>
                  <th>
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
                {rows.map((row, index) => (
                  <tr
                    key={index}
                    className={`${selectedRows.includes(row) ? "bg-neutral text-neutral-content" : "hover:bg-base-300 "} cursor-pointer, rounded-lg`}
                    onClick={() => row.vacancies > 0 && toggleSelection(row)}
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
                      />
                    </td>
                    <td>{row.name}</td>
                    <td>{row.currentCapacity}</td>
                    <td>{row.vacancies}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td className="text-center text-base-content">
                      No available spots found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination flex flex-wrap justify-between items-center my-4 gap-2">
            <div className="join ">
              <button
                className="btn btn-ghost join-item"
                onClick={() => setPage(0)}
                disabled={page === 0}
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
              <span className="font-semibold join-item p-2 text-neutral-content bg-neutral text-center flex items-center">
                {page + 1} / {totalPages}
              </span>
              <button
                className="flex flex-nowrap btn btn-ghost join-item w-fit"
                onClick={() => setPage(page + 1)}
                disabled={page + 1 >= totalPages}
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
            <select
              className="font-semibold btn p-2 text-neutral-content bg-neutral text-center flex items-center"
              onChange={(e) =>
                setStatus(e.target.value as "Finalized" | "Pending")
              }
            >
              <option value="Pending">Venter</option>
              <option value="Finalized">Finalized</option>
            </select>
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
                  selectedRows.forEach((selectedRow) => {
                    saveDistribution(
                      selectedOrder.id,
                      selectedRow.id,
                      Math.min(
                        selectedRow.freeSpots,
                        selectedOrder?.numStudents -
                          selectedOrder?.numStudentsAccepted
                      )
                    );
                  });
                }}
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
