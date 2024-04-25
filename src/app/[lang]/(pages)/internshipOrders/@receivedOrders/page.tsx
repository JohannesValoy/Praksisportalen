/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { Order, fetchOrders } from "./actions";
import ContainerBox from "@/app/components/ContainerBox";
import ErrorModal from "@/app/components/ErrorModal";

export default function Page() {
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
