"use client";
import React, { useCallback, useEffect, useState } from "react";
import { fetchOrders, saveOrderStatus } from "./actions";
import ErrorModal from "@/app/_components/ErrorModal";
import InternshipDistributionModal from "./Modal";
import LogIcon from "@/../public/Icons/logIcon";

/**
 * The page to display received orders.
 * @returns The page to display received orders.
 */
export default function Page() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [title, setTitle] = useState("Received Orders");
  // Filter status is used to filter by status to either see all the Finalized orders, or see all the pending orders. In this page this is used when clicking the log button
  const [filterStatus, setFilterStatus] = useState<"Finalized" | "Pending">(
    "Pending",
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
    fetch();
  }, [fetch]);

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
    setSelectedOrder(null);
  };

  useEffect(() => {
    if (!selectedOrder) {
      fetch();
    }
  }, [fetch, selectedOrder]);

  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.internshipOrderID]) {
      acc[order.internshipOrderID] = [];
    }
    acc[order.internshipOrderID].push(order);
    return acc;
  }, {});

  return (
    <>
      <div className="flex flex-row gap-4 items-center mx-10 p-2 md:p-8">
        <h1 className="text-2xl font-bold">{title}</h1>

        <button
          aria-label="Toggle Order Status"
          className={`btn ${
            filterStatus === "Finalized" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => {
            if (filterStatus === "Finalized") {
              setTitle("Received Orders");
              setFilterStatus("Pending");
            } else {
              setFilterStatus("Finalized");
              setTitle("Finalized Orders");
            }
          }}
        >
          <LogIcon />
        </button>
      </div>
      <div>
        <div className="flex flex-col gap-5 justify-center">
          {orders?.length === 0 ? (
            <div className="text-neutral-content text-center">No orders</div>
          ) : null}
          {Object.keys(groupedOrders).map((internshipOrderID) => (
            <div
              key={internshipOrderID}
              className="card-body card bg-neutral shadow-xl w-full"
            >
              <div className="text-lg font-bold">
                {
                  groupedOrders[internshipOrderID][0].studyProgram
                    .educationInstitute.name
                }{" "}
                - {groupedOrders[internshipOrderID][0].studyProgram.name}
              </div>
              {groupedOrders[internshipOrderID].map((order) => (
                <div key={order.id} className="text-base-content flex">
                  <div className="flex w-full flex-row justify-center items-center">
                    <div className="text-opacity-50">
                      {order.numStudents - order.numStudentsAccepted} students
                    </div>
                    <div className="text-opacity-50">
                      {order.internshipField} {order.studyYear} year students
                    </div>
                    <div className="text-sm text-opacity-50">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    className="btn btn-primary ml-2 md:ml-5"
                    onClick={() => {
                      setSelectedOrder(order);
                    }}
                    disabled={order.status === "Finalized"}
                  >
                    Distribute
                  </button>
                </div>
              ))}
              <div className="dropdown dropdown-middle w-full">
                <button
                  tabIndex={0}
                  className="w-full font-semibold btn p-2 text-neutral-content bg-neutral text-center flex items-center"
                >
                  {groupedOrders[internshipOrderID][0].status}
                </button>
                <ul className="flex dropdown-content w-full z-[1] menu p-2 bg-neutral rounded-box gap-2 shadow-xl border border-base-300">
                  <li>
                    <button
                      className="flex justify-center text-neutral-content p-3 bg-base hover:bg-accent hover:text-accent-content focus:bg-accent focus:text-accent-content"
                      onClick={() => {
                        // Directly call saveStatus passing the order ID and new status
                        saveStatus(internshipOrderID, "Pending");
                      }}
                    >
                      Pending
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex justify-center text-base-content p-3 bg-base hover:bg-accent hover:text-accent-content focus:bg-accent focus:text-accent-content"
                      onClick={() => {
                        // Directly call saveStatus passing the order ID and new status
                        saveStatus(internshipOrderID, "Finalized");
                      }}
                    >
                      Finalized
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedOrder && (
        <InternshipDistributionModal
          selectedOrder={selectedOrder}
          closeModal={closeModal}
          setError={setError}
        />
      )}

      {error && (
        <ErrorModal message={error} closeModal={() => setError(null)} />
      )}
    </>
  );
}
