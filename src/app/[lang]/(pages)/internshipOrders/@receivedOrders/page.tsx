"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  fetchOrders,
  paginateInternships,
  saveOrderDistribution,
  saveOrderStatus,
} from "./actions";
import ErrorModal from "@/app/components/ErrorModal";
import InternshipDistributionModal from "./Modal";
import ListOfOrders from "./ListOfOrders";
import { InternshipPaginationRequest } from "@/app/_models/InternshipPosition";
import LogIcon from "@/../public/Icons/logIcon";

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
  const [title, setTitle] = useState("Mottatte bestillinger");
  const [status, setStatus] = useState<"Finalized" | "Pending">("Pending");

  const [filterStatus, setFilterStatus] = useState<"Finalized" | "Pending">(
    "Pending",
  );

  /**
   * Fetches the orders from the database.
   */
  function fetch() {
    fetchOrders(filterStatus)
      .then(setOrders)
      .catch((error) => setError(error.message));
  }
  useEffect(() => {
    fetchOrders(filterStatus)
      .then(setOrders)
      .catch((error) => setError(error.message));
  }, [filterStatus]);

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
        selectedOrder.numStudents - selectedOrder.numStudentsAccepted,
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
          vacanciesSelected,
      ),
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
    console.log(
      "selectedOrder.numStudents: " +
        selectedOrder.numStudents +
        " selectedOrder.numStudentsAccepted: " +
        selectedOrder.numStudentsAccepted,
    );
    let amount = selectedOrder.numStudents - selectedOrder.numStudentsAccepted;
    selectedRows.forEach((selectedRow) => {
      if (amount <= 0) {
        console.log("amount: " + amount + "returning");
        return;
      }

      console.log(
        "saving: selectedOrder.id" +
          selectedOrder.id +
          " selectedRow.id: " +
          selectedRow.id +
          " Math.min(amount, selectedRow.vacancies): " +
          Math.min(amount, selectedRow.vacancies) +
          console.log("amount: " + amount),
      );
      saveDistribution(
        selectedOrder.id,
        selectedRow.id,
        Math.min(amount - numDoneStudents, selectedRow.vacancies),
      );
      numDoneStudents = numDoneStudents + selectedRow.vacancies;
      console.log(
        "numDoneStudents: " + Math.min(amount, selectedRow.vacancies),
      );
    });
    console.log("finished");
  }

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
    fetch();
  }

  /**
   * Save the status of the distribution.
   * @param orderID The ID of the order to save the status of.
   * @param status The status to save.
   */
  function saveStatus(orderID, status) {
    saveOrderStatus(orderID, status);
    fetch();
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

  //Makes the default value of the status selector Finalized when accessing it through the log and Pending when accessing the pending orders
  useEffect(() => {
    if (isModalOpen) {
      setStatus(filterStatus);
    }
  }, [isModalOpen, filterStatus]);
  return (
    <>
      <div className="flex justify-between items-center mx-10">
        <div className="w-56"></div> {/* Placeholder div */}
        <h1 className="text-2xl font-bold">Bestillinger</h1>
        <div className="w-56 flex justify-end">
          <button
            className={` btn ${filterStatus === "Finalized" ? "btn-primary" : "btn-ghost"} mt-5`}
            aria-label="Logg"
            onClick={() => {
              if (filterStatus === "Finalized") {
                setTitle("Mottatte bestillinger");
                setFilterStatus("Pending");
              } else {
                setFilterStatus("Finalized");
                setTitle("Distribuerte bestillinger");
              }
            }}
          >
            <LogIcon />
          </button>
        </div>
      </div>

      <ListOfOrders
        orders={orders}
        setSelectedOrder={setSelectedOrder}
        setIsModalOpen={setIsModalOpen}
        saveStatus={saveStatus}
        title={title}
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
          saveRows={saveRows}
        />
      )}

      {isErrorModalOpen && (
        <ErrorModal message={error} setIsModalOpen={setIsErrorModalOpen} />
      )}
    </>
  );
}

export default Page;
