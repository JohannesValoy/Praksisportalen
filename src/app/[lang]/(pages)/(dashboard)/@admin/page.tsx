"use client";

import ContainerBox from "@/app/components/ContainerBox";
import { PieChart } from "@mui/x-charts/PieChart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchOrders } from "../../internshipOrders/@receivedOrders/actions";
import ErrorModal from "@/app/components/ErrorModal";

const pieParams = { margin: { right: 5 }, height: 400, width: 400 };

/**
 * The admin layout component contains the main dashboard for the admin
 * @returns A react component with the admin dashboard
 */
const AdminLayout = () => {
  const [error, setError] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders("Pending")
      .then(setOrders)
      .catch((error) => setError(error.message));
  }, []);
  return (
    <div className="flex flex-row items-center rounded-lg gap-20 ">
      <div className="flex flex-col items-center">
        <ContainerBox title={"Statistics"}>
          <PieChart
            series={[{ data: [{ value: 10 }, { value: 15 }, { value: 20 }] }]}
            {...pieParams}
          />
        </ContainerBox>
        <ContainerBox title="Received Orders">
          {orders.length > 0 ? (
            <button
              className="stack w-full h-fit"
              aria-label="Go to pending Orders"
              onClick={() => (window.location.href = "/internshipOrders")}
            >
              {orders.map((order, index) => (
                <div
                  key={order.id}
                  className={`card shadow-${index} bg-base-100 shadow-xl text-primary hover:scale-105 transition-transform duration-200`}
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
        <ContainerBox title={"Import Data"}>
          <Link href="bulkImport" className="btn btn-primary">
            Import Data from Excel
          </Link>
        </ContainerBox>
        <div className="flex flex-row">
          <ContainerBox title={"Hospital"} className="w-full">
            <Link href="users/employees" className="btn btn-primary">
              Employees
            </Link>
            <Link href="departments" className="btn btn-primary">
              Departments
            </Link>
            <Link href="sections" className="btn btn-primary">
              Sections
            </Link>
          </ContainerBox>
          <ContainerBox title={"Internships"} className="w-full">
            <Link href="internshipOrders" className="btn btn-primary">
              Received Orders
            </Link>
            <Link href="internships" className="btn btn-primary">
              Internships
            </Link>
            <Link href="internshipAgreements" className="btn btn-primary">
              Internship Agreements
            </Link>
          </ContainerBox>
        </div>
        <ContainerBox title={"Education Institution"}>
          <Link href="users/coordinators" className="btn btn-primary">
            Coordinators
          </Link>
          <Link href="studyprograms" className="btn btn-primary">
            Studies
          </Link>
          <Link href="educationInstitutions" className="btn btn-primary">
            Education Institutions
          </Link>
        </ContainerBox>
      </div>
      {isErrorModalOpen && (
        <ErrorModal
          message={error}
          setIsModalOpen={setIsErrorModalOpen}
        ></ErrorModal>
      )}
    </div>
  );
};
export default AdminLayout;
