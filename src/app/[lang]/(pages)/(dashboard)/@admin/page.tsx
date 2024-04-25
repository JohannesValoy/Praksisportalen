/** @format */

"use client";

import ContainerBox from "@/app/components/ContainerBox";
import { PieChart } from "@mui/x-charts/PieChart";
import Link from "next/link";

const pieParams = { margin: { right: 5 }, height: 400, width: 400 };

const AdminLayout = () => {
  return (
    <div className="flex flex-row  rounded-lg w-full h-full mx-auto">
      <div className="flex flex-col items-center h-full w-full">
        <ContainerBox title={"Statistics"} className="w-fit">
          <PieChart
            series={[{ data: [{ value: 10 }, { value: 15 }, { value: 20 }] }]}
            {...pieParams}
          />
        </ContainerBox>
        <ContainerBox title={"Notifications"} className="w-fit">
          <div role="alert" className="alert shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>

            <div>
              <h3 className="font-bold">New Internship Request!</h3>
              <div className="text-xs">You have 1 unread message</div>
            </div>
            <button className="btn btn-sm">See</button>
          </div>
          <div role="alert" className="alert shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              <h3 className="font-bold">New message!</h3>
              <div className="text-xs">You have 1 unread message</div>
            </div>
            <button className="btn  btn-sm">See</button>
          </div>
        </ContainerBox>
      </div>
      <div className="flex flex-col items-center w-full h-full">
        <ContainerBox title={"Import Data"} className="w-fit">
          <Link href="bulkImport" className="btn btn-primary">
            Import Data from Excel
          </Link>
        </ContainerBox>
        <ContainerBox title={"Education Institution"} className="w-fit">
          <Link href="users/administerCoordinators" className="btn btn-primary">
            Koordinatorer
          </Link>
          <Link href="studyprograms" className="btn btn-primary">
            Studies
          </Link>
          <Link href="educationInstitutions" className="btn btn-primary">
            Education Institutions
          </Link>
        </ContainerBox>
        <ContainerBox title={"Hospital"} className="w-fit">
          <Link href="users/administerEmployees" className="btn btn-primary">
            Ansatte
          </Link>
          <Link href="departments" className="btn btn-primary">
            Avdelinger
          </Link>
          <Link href="sections" className="btn btn-primary">
            Seksjoner
          </Link>
        </ContainerBox>
        <ContainerBox title={"Internships"} className="w-fit">
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
    </div>
  );
};

export default AdminLayout;
