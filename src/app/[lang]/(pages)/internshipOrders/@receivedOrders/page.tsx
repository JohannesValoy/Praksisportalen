/** @format */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReactModal from "react-modal";
import { fetchOrders, paginateInternships } from "./actions";
import ContainerBox from "@/app/components/ContainerBox";
import ErrorModal from "@/app/components/ErrorModal";

function Page() {
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ReactModal.setAppElement("#root");
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchOrders()
      .then(setOrders)
      .catch((error) => setError(error.message));

    setIsLoading(false);
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
      setStudentsLeft(selectedOrder.numStudents); // Reset students left to distribute when a new order is selected
    }
  }, [isModalOpen, selectedOrder, fetchInternships]);

  const toggleSelection = (row) => {
    let currentIndex = selectedRows.indexOf(row);
    let newSelectedRows = [...selectedRows];
    let vacanciesSelected = selectedRows.reduce(
      (total, row) => total + row.freeSpots,
      0
    );

    if (currentIndex !== -1) {
      newSelectedRows.splice(currentIndex, 1);
      vacanciesSelected -= row.freeSpots;
    } else {
      newSelectedRows.push(row);
      vacanciesSelected += row.freeSpots;
    }
    console.log("vacanciesSelected", vacanciesSelected);

    setSelectedRows(newSelectedRows);
    setStudentsLeft(Math.max(0, selectedOrder.numStudents - vacanciesSelected)); // Ensure it never goes negative
  };
  return (
    <>
      <ContainerBox title="Received Orders">
        {isLoading ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : (
          <div className="flex flex-col gap-5 justify-center">
            {orders.map((order) => (
              <div key={order.id} className="card bg-base-100 shadow-xl">
                <div className="card-body flex gap-5">
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
                      className="btn btn-primary ml-5"
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsModalOpen(true);
                      }}
                    >
                      Open Modal
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ContainerBox>
      <ReactModal
        appElement={document.getElementById("root")}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-base-200 bg-opacity-90 transition-opacity"
        contentLabel="Internship Distribution Modal"
      >
        <div className="flex flex-col bg-base-100 rounded-xl shadow-lg max-w-4xl w-full mx-auto p-5 gap-5">
          <h1 className="text-3xl font-bold text-center title">
            Praksisplassdistribuering for {selectedOrder?.studyProgram.name}
          </h1>
          <div className="flex flex-wrap gap-5 text-center justify-between text-base-content w-full">
            <div>
              <p>
                Start Date:{" "}
                {selectedOrder?.startWeek.toISOString().split("T")[0]}
              </p>
              <p>
                End Date: {selectedOrder?.endWeek.toISOString().split("T")[0]}
              </p>
            </div>
            <div>
              <p className="text-lg font-bold text-secondary">
                Students left to assign: {studentsLeft}
              </p>
              <p className="text-lg">
                Number of students: {selectedOrder?.numStudents}
              </p>
            </div>
          </div>

          <p>Comment: {selectedOrder?.comment}</p>

          <div className="overflow-x-auto">
            <table className="table w-full text-sm rounded-xl overflow-hidden">
              <thead>
                <tr className="text-xs uppercase bg-base-200">
                  <th></th>
                  <th>Name</th>
                  <th>Field</th>
                  <th>Study Year</th>
                  <th>Free Spots</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={index}
                    className={`${selectedRows.includes(row) ? "bg-accent" : "hover:bg-base-300"} cursor-pointer, rounded-lg`}
                    onClick={() => toggleSelection(row)}
                  >
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={selectedRows.includes(row)}
                        onChange={() => toggleSelection(row)}
                      />
                    </td>
                    <td>{row.name}</td>
                    <td>{row.field}</td>
                    <td>{row.studyYear}</td>
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

          <div className="pagination flex items-center my-4">
            <div className="join ">
              <button
                className="btn btn-ghost join-item"
                onClick={() => setPage(0)}
                disabled={page === 0}
              >
                First
              </button>
              <button
                className="btn btn-ghost join-item"
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
              >
                Previous
              </button>
              <span className="font-semibold join-item p-2">
                Page {page + 1} of {totalPages}
              </span>
              <button
                className="btn btn-ghost join-item"
                onClick={() => setPage(page + 1)}
                disabled={page + 1 >= totalPages}
              >
                Next
              </button>
              <button
                className="btn btn-ghost join-item"
                onClick={() => setPage(totalPages - 1)}
                disabled={page + 1 >= totalPages}
              >
                Last
              </button>
            </div>
            <button
              className="btn btn-error ml-auto mr-2"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
            <button
              className="btn btn-success"
              onClick={() => alert("Save functionality to be implemented.")}
            >
              Save
            </button>
          </div>
        </div>
      </ReactModal>

      {isErrorModalOpen && (
        <ErrorModal message={error} setIsModalOpen={setIsErrorModalOpen} />
      )}
    </>
  );
}

export default Page;
