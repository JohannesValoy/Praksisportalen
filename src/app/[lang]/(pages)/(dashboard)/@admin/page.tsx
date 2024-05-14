"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Cog6ToothIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ClipboardIcon,
  ArrowUpOnSquareIcon,
  ArrowRightIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { fetchOrders } from "../../internshipOrders/@receivedOrders/actions";
import Link from "next/link";

// Custom container component for better styling and functionality
const ClickableContainer = ({
  title,
  icon,
  link,
  description,
  children,
}: {
  title: string;
  icon: JSX.Element;
  link?: string;
  description?: string;
  children?: JSX.Element | JSX.Element[];
}) => {
  const router = useRouter();
  return (
    <button
      className={`bg-neutral text-neutral-content rounded-3xl p-8 flex justify-between items-between hover:shadow-xl`}
      onClick={() => link && router.push(link)}
    >
      <div className="flex flex-col h-full justify-between w-full">
        <h2 className="font-bold stroke-lg ">{title}</h2>
        <p className="font-bold stroke-lg ">{description}</p>
        <div className="font-bold stroke-lg  flex items-center justify-start">
          {children}
        </div>
      </div>
      <div
        className={`p-5 bg-accent text-base-content rounded-full h-fit w-fit `}
      >
        {icon}
      </div>
    </button>
  );
};

const AdminLayout = () => {
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders("Pending")
      .then(setOrders)
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div className="md:p-5">
      <h1 className="text-4xl mb-5 text-center font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <ClickableContainer
          title="Manage Hospital"
          icon={
            <Cog6ToothIcon
              className="h-20 w-20 fill-none stroke-1 stroke-accent-content "
              name="settings"
            />
          }
        >
          <Link href="departments" className="btn btn-ghost">
            Departments
          </Link>
          <Link href="sections" className="btn btn-ghost">
            Sections
          </Link>
          <Link href="internships" className="btn btn-ghost">
            Internships
          </Link>
        </ClickableContainer>
        <ClickableContainer
          title="Education Institutions"
          icon={
            <AcademicCapIcon className="h-20 w-20 fill-none stroke-1  stroke-accent-content " />
          }
        >
          <Link href="educationInstitutions" className="btn btn-ghost">
            Schools
          </Link>
          <Link href="internshipAgreements" className="btn btn-ghost">
            Agreements
          </Link>
          <Link href="studyprograms" className="btn btn-ghost">
            Studies
          </Link>
        </ClickableContainer>
        <ClickableContainer
          title="User Management"
          icon={
            <UserGroupIcon className="h-20 w-20 fill-none stroke-1 stroke-accent-content " />
          }
        >
          <Link href="users/employees" className="btn btn-ghost">
            Employees
          </Link>
          <Link href="users/coordinators" className="btn btn-ghost">
            Coordinators
          </Link>
          <Link href="users/students" className="btn btn-ghost">
            Students
          </Link>
          <Link href="users/add" className="btn btn-ghost" name="add user">
            <UserPlusIcon className="h-6 w-6" />
          </Link>
        </ClickableContainer>
        <ClickableContainer
          title="Import Data"
          icon={
            <ArrowUpOnSquareIcon className="h-20 w-20 fill-none stroke-1 stroke-accent-content " />
          }
          link="/bulkImport"
        >
          <div className="flex">
            Import Data <ArrowRightIcon className="h-6 w-6" />
          </div>
        </ClickableContainer>

        <ClickableContainer
          title="Internship Orders"
          icon={
            <ClipboardIcon className="h-20 w-20 fill-none stroke-1 stroke-accent-content " />
          }
          link="/internshipOrders"
        >
          {orders.length > 0 ? (
            <button
              className="stack w-full"
              aria-label="Go to pending Orders"
              onClick={() => (window.location.href = "/internshipOrders")}
            >
              {orders.map((order, index) => (
                <div
                  key={order.id}
                  className={`card shadow-${index} bg-neutral border border-base-100 shadow-lg text-base-content hover:scale-105 duration-200`}
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
            <p>No pending orders</p>
          )}
        </ClickableContainer>
      </div>
    </div>
  );
};

export default AdminLayout;
