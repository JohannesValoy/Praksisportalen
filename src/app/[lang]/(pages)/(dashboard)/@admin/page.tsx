"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ErrorModal from "@/app/_components/ErrorModal";
import { useRouter } from "next/navigation";
import homePageImage from "./helsemr-home-page-image.jpg";

import {
  Cog6ToothIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ClipboardIcon,
  ArrowUpOnSquareIcon,
  ArrowRightIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { fetchOrders } from "../../internshipOrders/@receivedOrders/actions";
import Link from "next/link";

// Custom container component for better styling and functionality
const ClickableContainer = ({
  title,
  color,
  icon,
  link,
  description,
  children,
}: {
  title: string;
  color?: string;
  icon: JSX.Element;
  link?: string;
  description?: string;
  children?: JSX.Element | JSX.Element[];
}) => {
  const router = useRouter();
  return (
    <div
      className={`bg-neutral rounded-3xl p-8 flex justify-between items-between cursor-pointer hover:shadow-xl`}
      onClick={() => link && router.push(link)}
    >
      <div className="flex flex-col h-full justify-between w-full">
        <h3 className="font-bold stroke-lg text-neutral-content">{title}</h3>
        <h3 className="font-bold stroke-lg text-neutral-content">
          {description}
        </h3>
        <div className="font-bold stroke-lg text-neutral-content flex items-center justify-start">
          {children}
        </div>
      </div>
      <div
        style={{ backgroundColor: color }}
        className={`p-5 rounded-full h-fit w-fit `}
      >
        {icon}
      </div>
    </div>
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
      <div className="flex flex-col sm:flex-row sm:justify-center gap-2 md:gap-16 md:p-5 items-center w-full">
        <div className="flex justify-center items-center rounded-full w-80 md:w-96 bg-slate-600 overflow-hidden h-80 md:h-96">
          <Image
            src={homePageImage}
            alt="Healthcare Team"
            width={500}
            height={500}
            className="w-auto h-full max-w-none"
            objectPosition="center"
          />
        </div>
        <div className="md:w-3/5">
          <h1 className="font-bold md:text-5xl text-2xl lg:text-7xl  text-teal-950">
            Velkommen til
          </h1>
          <h1 className="font-bold md:text-5xl lg:text-7xl text-2xl text-teal-900">
            Praksisportalen HMR
          </h1>
          <p className="stroke-gray-500 text-2xl">
            På lag med deg for helsa di
          </p>
        </div>
      </div>

      <div className="mt-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <ClickableContainer
            title="Manage Hospital"
            icon={
              <Cog6ToothIcon className="h-20 w-20 fill-none stroke-1 stroke-neutral-content " />
            }
            color="#eddee5"
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
              <AcademicCapIcon className="h-20 w-20 fill-none stroke-1  stroke-neutral-content " />
            }
            color="#c8eae4"
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
              <UserGroupIcon className="h-20 w-20 fill-none stroke-1 stroke-neutral-content " />
            }
            color="#f2e5d9"
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
            <Link href="users/add" className="btn btn-ghost">
              <PlusIcon className="h-6 w-6" />
            </Link>
          </ClickableContainer>
          <ClickableContainer
            title="Import Data"
            icon={
              <ArrowUpOnSquareIcon className="h-20 w-20 fill-none stroke-1 stroke-neutral-content " />
            }
            link="/bulkImport"
            color="#e0ebe5"
          >
            <div className="flex">
              Import Data <ArrowRightIcon className="h-6 w-6" />
            </div>
          </ClickableContainer>

          <ClickableContainer
            title="Internship Orders"
            icon={
              <ClipboardIcon className="h-20 w-20 fill-none stroke-1 stroke-neutral-content " />
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
    </div>
  );
};

export default AdminLayout;
