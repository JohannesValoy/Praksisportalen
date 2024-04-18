"use client";
import React, { useEffect, useState } from "react";
import { fetchOrders } from "./actions";
import ContainerBox from "@/app/components/ContainerBox";

export default function Page() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  return (
    <ContainerBox title={"Received Orders"}>
      {orders ? (
        orders.map((order) => (
          <div key={order.id} className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              {order.name}
            </div>
            <div className="collapse-content">
              {/* Render order details here */}
              <p>Order ID: {order.id}</p>
              {/* Add more details as needed */}
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </ContainerBox>
  );
}
