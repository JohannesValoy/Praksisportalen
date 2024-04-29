/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { Order, fetchOrders } from "./actions";
import ContainerBox from "@/app/components/ContainerBox";
import ErrorModal from "@/app/components/ErrorModal";
import DynamicTable from "@/app/components/DynamicTable";
import { deleteInternship, paginateInternships } from "./actions";
import ReactModal from "react-modal";
export default function Page() {
  const [orders, setOrders] = useState<Order[]>(null);
  const [error, setError] = useState<string>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch((error: any) => {
        setError(error.message);
      });
  }, []);

  let totalStudentsToDistribute = 0;
  let params;

  return (
    <>
      <ContainerBox title={"Received Orders"}>
        <div className="flex flex-col gap-5 overflow-hidden ">
          {orders ? (
            orders.length > 0 ? (
              [...orders].reverse().map((order) => (
                <div key={order.id} className="collapse bg-base-200">
                  <input type="checkbox" />
                  <div className="text-xl font-medium">
                    {order.studyProgram.educationInstitute.name} /{" "}
                    {order.studyProgram.name} / {order.internshipField} /{" "}
                    {order.studyYear}. år studenter /{" "}
                    {order.createdAt.toLocaleDateString()} (Click to open/close)
                    {(totalStudentsToDistribute += order.numStudents)}
                  </div>
                  <div className="collapse-content">
                    <p>Number of students: {order.numStudents}</p>
                    <p>
                      Start Date: {order.startWeek.toISOString().split("T")[0]}
                    </p>
                    <p>End Date: {order.endWeek.toISOString().split("T")[0]}</p>
                    <p>Comment: {order.comment}</p>
                  </div>

                  <button
                    key={order.id}
                    className="btn bg-base-200"
                    onClick={() => {
                      setIsModalOpen(true);
                      params = {
                        field: order.internshipField,
                        yearOfStudy: order.studyYear,
                      };
                      console.log("params in button: " + params);
                    }}
                  >
                    Open Modal
                  </button>
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
        <h2>Amount of Students to distribute: {totalStudentsToDistribute}</h2>
      </ContainerBox>
      <ReactModal
        isOpen={isModalOpen}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <DynamicTable
          params={params}
          tableName={"Internship Spots"}
          headers={{
            Name: "name",
            Field: "field",
            "Study Year": "yearOfStudy",
            "Free Spots": "freeSpots",
          }}
          onRowClick={() => {}}
          onRowButtonClick={(row) => {
            window.location.href = `/internships/individualInternship?internship_id=${row.id}`;
          }}
          buttonName={"+"}
          onAddButtonClick={() => {
            console.log("Add button clicked");
          }}
          deleteFunction={deleteInternship}
          paginateFunction={paginateInternships}
        />
        <button className="btn btn-info" onClick={() => setIsModalOpen(false)}>
          Close
        </button>
      </ReactModal>
    </>
  );
}
