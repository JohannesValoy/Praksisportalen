"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  fetchOrders,
  paginateInternships,
  saveOrderDistribution,
} from "./actions";
import ErrorModal from "@/app/components/ErrorModal";
import InternshipDistributionModal from "./Modal";
import ListOfOrders from "./ListOfOrders";
import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";
import LogIcon from "../../../../../../public/Icons/logIcon";

/**
 * The page to display received orders.
 * @returns The page to display received orders.
 */
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
  const [totalPages, setTotalPages] = useState(0);
  const [studentsLeft, setStudentsLeft] = useState(0);
  const [status, setStatus] = useState<"Finalized" | "Pending">("Pending");

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch((error) => setError(error.message));
  }, []);

  const fetchInternships = useCallback(() => {
    if (!selectedOrder) return;

    const params: InternshipPaginationRequest = {
      page,
      size: 5,
      sort: sortedBy,
      vacancyStartDate: selectedOrder.startWeek,
      vacancyEndDate: selectedOrder.endWeek,
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
  }, [page, sortedBy, selectedOrder]);

  useEffect(() => {
    if (isModalOpen && selectedOrder) {
      fetchInternships();
      setStudentsLeft(
        selectedOrder.numStudents - selectedOrder.numStudentsAccepted
      );
      setSelectedRows([]);
      setError(null);
    }
  }, [isModalOpen, selectedOrder, fetchInternships]);
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

  //TODO make it save even with only status
  /**
   * Save the distribution of students to internships.
   * @param subFieldGroupID The ID of the subFieldGroup to distribute students to.
   * @param InternshipID The ID of the internship to distribute students to.
   * @param amount The amount of students to distribute.
   */
  function saveDistribution(subFieldGroupID, InternshipID, amount) {
    saveOrderDistribution(subFieldGroupID, InternshipID, amount, status)
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

  return (
    <>
      <div className="ml-auto mt-5 mr-10">
        <LogIcon />
      </div>

      <ListOfOrders
        orders={orders}
        setSelectedOrder={setSelectedOrder}
        setIsModalOpen={setIsModalOpen}
      />
      {isModalOpen && (
        <InternshipDistributionModal
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
          setStatus={setStatus}
        />
      )}

      {isErrorModalOpen && (
        <ErrorModal message={error} setIsModalOpen={setIsErrorModalOpen} />
      )}
    </>
  );
}

export default Page;
