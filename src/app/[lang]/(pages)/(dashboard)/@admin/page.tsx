"use client";

import ContainerBox from "@/app/_components/ContainerBox";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchOrders } from "../../internshipOrders/@receivedOrders/actions";
import ErrorModal from "@/app/_components/ErrorModal";

/**
 * The admin layout component contains the main dashboard for the admin
 * @returns A react component with the admin dashboard
 */
const AdminLayout = () => {
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders("Pending")
      .then(setOrders)
      .catch((error) => setError(error.message));
  }, []);
  return (
    <div className="flex flex-row flex-wrap items-center justify-center rounded-lg gap-20 ">
      <div className="flex flex-col items-center">
        <ContainerBox title="Received Orders" className="items-center">
          <Link href="internshipOrders" className="btn btn-primary">
            Go to Received Orders
          </Link>
          {orders.length > 0 ? (
            <button
              className="stack w-full"
              aria-label="Go to pending Orders"
              onClick={() => (window.location.href = "/internshipOrders")}
            >
              {orders.map((order, index) => (
                <div
                  key={order.id}
                  className={`card shadow-${index} bg-base-100 shadow-xl text-base-content hover:scale-105 duration-200`}
                >
                  <div className="card-body">
                    <h2 className="card-title">
                      {order.studyProgram.educationInstitute.name} -{" "}
                      {order.studyProgram.name}
                    </h2>
                    <p className="text-opacity-80">
                      {order.numStudents} students
                    </p>
                    <p className="text-opacity-80">
                      {order.internshipField}, {order.studyYear} år studenter
                    </p>
                    <p className="text-sm text-opacity-80">
                      {order.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  {index === 0 && orders.length > 1 && (
                    <div className="badge badge-secondary p-5 rounded-2xl">
                      + {orders.length - 1}
                    </div>
                  )}
                </div>
              ))}
            </button>
          ) : (
            "No pending orders"
          )}
        </ContainerBox>
      </div>
      <div className="flex flex-col items-center">
        <ContainerBox title="Import Data">
          <Link href="bulkImport" className="btn btn-primary">
            Import Data from Excel
          </Link>
        </ContainerBox>
        <ContainerBox
          title="Hospital"
          className="items-center"
          subClassName="flex-row"
        >
          <Link href="departments" className="btn btn-primary">
            Departments
          </Link>
          <Link href="sections" className="btn btn-primary">
            Sections
          </Link>
          <Link href="internships" className="btn btn-primary">
            Internships
          </Link>
        </ContainerBox>
        <ContainerBox
          title="Education Institution"
          className="items-center"
          subClassName="flex-row"
        >
          <Link href="educationInstitutions" className="btn btn-primary">
            Education Institutions
          </Link>
          <Link href="internshipAgreements" className="btn btn-primary">
            Internship Agreements
          </Link>
          <Link href="studyprograms" className="btn btn-primary">
            Studies
          </Link>
        </ContainerBox>
        <ContainerBox
          title="Users"
          className="items-center"
          subClassName="flex-row"
        >
          <Link href="users/employees" className="btn btn-primary">
            Employees
          </Link>
          <Link href="users/coordinators" className="btn btn-primary">
            Coordinators
          </Link>
          <Link href="users/students" className="btn btn-primary">
            Students
          </Link>
          <Link href="users/add" className="btn btn-primary">
            Add user
          </Link>
        </ContainerBox>
      </div>
      {error && (
        <ErrorModal message={error} closeModal={() => setError(null)} />
      )}
    </div>
  );
};
export default AdminLayout;
