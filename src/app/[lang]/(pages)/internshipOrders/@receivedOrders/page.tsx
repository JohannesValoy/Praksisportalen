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
  const [title, setTitle] = useState("Mottatte bestillinger");

  const [status, setStatus] = useState<"Finalized" | "Pending">("Pending");
  //Filter status is used to filter by status to either see all the Finalized orders, or see all the pending orders. In this page this is used when clicking the log button
  const [filterStatus, setFilterStatus] = useState<"Finalized" | "Pending">(
    "Pending"
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
          selectedOrder={selectedOrder}
          closeModal={closeModal}
        />
      )}

      {isErrorModalOpen && (
        <ErrorModal message={error} setIsModalOpen={setIsErrorModalOpen} />
      )}
    </>
  );
}

export default Page;
