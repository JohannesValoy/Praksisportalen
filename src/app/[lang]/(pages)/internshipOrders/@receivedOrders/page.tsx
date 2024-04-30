"use client";
import React, { useEffect, useState } from "react";
import { Order, fetchOrders } from "./actions";
import ContainerBox from "@/app/components/ContainerBox";
/**
 * The page to display received orders.
 * @returns The page to display received orders.
 */
export default function Page() {
  //TODO: I see no reason to use a state here. The orders are fetched once and then displayed.
  //Instead we can convert it into a server component and just fetch it the first time.
  const [orders, setOrders] = useState<Order[]>(null);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  return (
    <ContainerBox title={"Received Orders"}>
      <div className="flex flex-col gap-5 overflow-hidden ">
        {orders ? (
          [...orders].reverse().map((order) => (
            <div
              key={order.id}
              className="collapse bg-base-200 text-base-content"
            >
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                {order.studyProgram.educationInstitute.name} /{" "}
                {order.studyProgram.name} / {order.internshipField} /{" "}
                {order.studyYear} / {order.created_at.toLocaleDateString()}{" "}
                (Click to open/close)
              </div>
              <div className="collapse-content">
                <p>Number of students: {order.numStudents}</p>
                <p>Start week: {order.startWeek}</p>
                <p>End week: {order.endWeek}</p>
                <p>Comment: {order.comment.toString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </ContainerBox>
  );
}
