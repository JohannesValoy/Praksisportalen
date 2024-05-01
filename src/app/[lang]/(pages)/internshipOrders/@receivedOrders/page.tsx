/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { Order, fetchOrders } from "./actions";
import ContainerBox from "@/app/components/ContainerBox";
import ErrorModal from "@/app/components/ErrorModal";

/**
 * The page to display received orders.
 * @returns The page to display received orders.
 */
export default function Page() {
  //TODO: I see no reason to use a state here. The orders are fetched once and then displayed.
  //Instead we can convert it into a server component and just fetch it the first time.
  const [orders, setOrders] = useState<Order[]>(null);
  const [error, setError] = useState<string>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch((error: any) => {
        setError(error.message);
      });
  }, []);

  return (
    <ContainerBox title={"Received Orders"}>
      <div className="flex flex-col gap-5 overflow-hidden ">
        {orders ? (
          orders.length > 0 ? (
            [...orders].reverse().map((order) => (
              <div key={order.id} className="collapse bg-base-200">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  {order.studyProgram.educationInstitute.name} /{" "}
                  {order.studyProgram.name} / {order.internshipField} /{" "}
                  {order.studyYear}. år studenter /{" "}
                  {order.createdAt.toLocaleDateString()} (Click to open/close)
                </div>
                <div className="collapse-content">
                  <p>Number of students: {order.numStudents}</p>
                  <p>
                    Start Date: {order.startWeek.toISOString().split("T")[0]}
                  </p>
                  <p>End Date: {order.endWeek.toISOString().split("T")[0]}</p>
                  <p>Comment: {order.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )
        ) : error ? (
          isModalOpen && (
            <ErrorModal
              message={error}
              setIsModalOpen={setIsModalOpen}
            ></ErrorModal>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </ContainerBox>
  );
}
