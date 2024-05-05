"use client";
import React, { useCallback, useEffect, useState } from "react";
import { fetchOrders, saveOrderStatus } from "./actions";
import ErrorModal from "@/app/components/ErrorModal";
import InternshipDistributionModal from "./Modal";
import ListOfOrders from "./ListOfOrders";
import LogIcon from "@/../public/Icons/logIcon";

/**
 * The page to display received orders.
 * @returns The page to display received orders.
 */
function Page() {
  //TODO: I see no reason to use a state here. The orders are fetched once and then displayed.
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [title, setTitle] = useState("Mottatte bestillinger");
  //Filter status is used to filter by status to either see all the Finalized orders, or see all the pending orders. In this page this is used when clicking the log button
  const [filterStatus, setFilterStatus] = useState<"Finalized" | "Pending">(
    "Pending"
  );

  /**
   * Fetches the orders from the database.
   */
  const fetch = useCallback(() => {
    fetchOrders(filterStatus)
      .then(setOrders)
      .catch((error) => setError(error.message));
  }, [filterStatus]);

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

  useEffect(() => {
    if (!isModalOpen) {
      fetch();
    }
    console.log("updating");
  }, [fetch, isModalOpen]);

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
          setError={setError}
          setIsErrorModalOpen={setIsErrorModalOpen}
        />
      )}

      {isErrorModalOpen && (
        <ErrorModal message={error} setIsModalOpen={setIsErrorModalOpen} />
      )}
    </>
  );
}

export default Page;
