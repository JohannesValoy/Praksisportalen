/** @format */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReactModal from "react-modal";
import {
  fetchOrders,
  paginateInternships,
  saveOrderDistribution,
} from "./actions";
import ContainerBox from "@/app/components/ContainerBox";
/**
 * The page to display received orders.
 * @returns The page to display received orders.
 */
import ErrorModal from "@/app/components/ErrorModal";

function Page() {
  //TODO: I see no reason to use a state here. The orders are fetched once and then displayed.
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortedBy, setSortedBy] = useState<string>("name");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [studentsLeft, setStudentsLeft] = useState(0);

  useEffect(() => {
    ReactModal.setAppElement("#root");
  }, []);

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch((error) => setError(error.message));
  }, []);

  const fetchInternships = useCallback(() => {
    if (!selectedOrder) return;

    const params = {
      page,
      size: pageSize,
      sort: sortedBy,
      field: selectedOrder.internshipField,
      yearOfStudy: selectedOrder.studyYear,
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
  }, [page, pageSize, sortedBy, selectedOrder]);

  useEffect(() => {
    if (isModalOpen && selectedOrder) {
      fetchInternships();
      setStudentsLeft(selectedOrder.numStudents);
      setSelectedRows([]);
      setError(null);
    }
  }, [isModalOpen, selectedOrder, fetchInternships]);
  const toggleSelection = (row) => {
    // Ignore selection if the internship has no free spots left
    if (row.freeSpots <= 0) return;

    let currentIndex = selectedRows.indexOf(row);
    let newSelectedRows = [...selectedRows];

    if (currentIndex !== -1) {
      newSelectedRows.splice(currentIndex, 1); // Remove the row from selection
    } else {
      newSelectedRows.push(row); // Add the row to selection
    }

    // Recalculate vacanciesSelected with the updated newSelectedRows, only counting rows with free spots
    let vacanciesSelected = newSelectedRows.reduce((total, row) => {
      return row.freeSpots > 0 ? total + row.freeSpots : total;
    }, 0);

    console.log("vacanciesSelected", vacanciesSelected);

    setSelectedRows(newSelectedRows);
    setStudentsLeft(Math.max(0, selectedOrder.numStudents - vacanciesSelected)); // Ensure it never goes negative
  };

  function saveDistribution(subFieldGroupID, InternshipID, amount) {
    saveOrderDistribution(subFieldGroupID, InternshipID, amount)
      .then(() => {
        setIsModalOpen(false); // Show success modal
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to save distribution: " + error.message);
        setIsErrorModalOpen(true); // Show error modal
      });
    fetchOrders()
      .then(setOrders)
      .catch((error) => setError(error.message));
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setSelectedRows([]);
    setRows([]);
    setPage(0);
    setTotalPages(0);
    setStudentsLeft(0);
  };

  useEffect(() => {
    console.log("Component has re-rendered");
  });

  return (
    <>
      <ContainerBox title="Received Orders">
        {orders ? (
          <div className="flex flex-wrap gap-5 justify-center">
            {orders.map((order) => (
              <div
                key={order.id}
                className="card bg-base-100  text-base-content shadow-xl"
              >
                <div className="card-body flex gap-5 p-2 md:p-5">
                  <div className="flex flex-row items-center">
                    <div className="flex items-center flex-wrap flex-grow ml-4 gap-5">
                      <div className="text-lg font-bold">
                        {order.studyProgram.educationInstitute.name} -{" "}
                        {order.studyProgram.name}
                      </div>
                      <div className="text-opacity-50">
                        {order.numStudents} students
                      </div>
                      <div className="text-opacity-50">
                        {order.internshipField}, {order.studyYear} år studenter
                      </div>
                      <div className="text-sm text-opacity-50">
                        {order.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      className="btn btn-primary ml-2 md:ml-5"
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsModalOpen(true);
                      }}
                    >
                      Distribuer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span className="loading loading-spinner loading-lg"></span>
        )}
      </ContainerBox>
      {isModalOpen && (
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
                    <div className="font-bold text-primary">{studentsLeft}</div>
                    /
                    <div className="font-bold text-primary">
                      {selectedOrder?.numStudents}
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat chat-start">
                <div className="chat-bubble text-base-content bg-neutral">
                  {selectedOrder?.comment}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="table w-full text-sm rounded-xl overflow-hidden">
                  <thead>
                    <tr className="text-xs uppercase bg-base-200 text-base-content">
                      <th></th>
                      <th onClick={() => setSortedBy("name")}>Navn</th>
                      <th onClick={() => setSortedBy("internship_field")}>
                        Felt
                      </th>
                      <th onClick={() => setSortedBy("freeSpots")}>Ledig</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr
                        key={index}
                        className={`${selectedRows.includes(row) ? "bg-neutral" : "hover:bg-base-300"} cursor-pointer, rounded-lg`}
                        onClick={() =>
                          row.freeSpots > 0 && toggleSelection(row)
                        }
                      >
                        <td>
                          <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                            checked={selectedRows.includes(row)}
                            onChange={() =>
                              row.freeSpots > 0 && toggleSelection(row)
                            }
                            disabled={row.freeSpots <= 0}
                          />
                        </td>
                        <td>{row.name}</td>
                        <td>{row.field}</td>
                        <td>{row.freeSpots}</td>
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
                  <span className="font-semibold join-item p-2 bg-neutral text-center flex items-center">
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
                  className="font-semibold rounded-xl p-2 bg-neutral text-center flex items-center"
                  onChange={(e) => setPageSize(parseInt(e.target.value))}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
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
                        console.log(
                          "selectedOrder: " +
                            JSON.stringify(selectedOrder) +
                            " the given id from this is " +
                            selectedOrder.id
                        );
                        console.log(
                          "selectedRow: " + JSON.stringify(selectedRow)
                        );
                        console.log(
                          "selectedRow.freeSpots: " + selectedRow.freeSpots
                        );
                        console.log("studentsLeft: " + studentsLeft);
                        console.log(
                          Math.min(
                            selectedRow.freeSpots,
                            selectedOrder?.numStudents
                          )
                        );
                        //TODO FIX THIS LOGIC
                        saveDistribution(
                          selectedOrder.id,
                          selectedRow.id,
                          Math.min(
                            selectedRow.freeSpots,
                            selectedOrder?.numStudents
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
      )}

      {isErrorModalOpen && (
        <ErrorModal message={error} setIsModalOpen={setIsErrorModalOpen} />
      )}
    </>
  );
}

export default Page;
