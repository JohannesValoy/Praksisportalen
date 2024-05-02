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
import InternshipDistributionModal from "./Modal";

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
  const [pageSize, setPageSize] = useState(5);
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

  console.log(orders);

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
        <InternshipDistributionModal
          setIsModalOpen={setIsModalOpen}
          closeModal={closeModal}
          rows={rows}
          selectedRows={selectedRows}
          setSortedBy={setSortedBy}
          selectedOrder={selectedOrder}
          toggleSelection={toggleSelection}
          studentsLeft={studentsLeft}
          saveDistribution={saveDistribution}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          setPageSize={setPageSize}
        />
      )}

      {isErrorModalOpen && (
        <ErrorModal message={error} setIsModalOpen={setIsErrorModalOpen} />
      )}
    </>
  );
}

export default Page;
