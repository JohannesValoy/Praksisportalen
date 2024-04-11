/** @format */

"use client";

import ContainerBox from "@/app/components/ContainerBox";
import { PieChart } from "@mui/x-charts/PieChart";
import Link from "next/link";

const pieParams = { margin: { right: 5 } };

const AdminLayout = () => {
  return (
    <div className="  flex flex-row items-center justify-center rounded-lg w-full h-full container mx-auto">
      <div className="flex flex-col h-full w-full">
        <ContainerBox title={"Statistics"}>
          <PieChart
            series={[{ data: [{ value: 10 }, { value: 15 }, { value: 20 }] }]}
            {...pieParams}
          />
        </ContainerBox>
        <ContainerBox title={"Notifications"}>
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
            <button className="btn btn-sm">See</button>
          </div>
        </ContainerBox>
      </div>
      <div className="flex flex-col w-full h-full">
        <ContainerBox title={"Education Institution"}>
          <Link href="/users/administerCoordinators" className="btn">
            Koordinatorer
          </Link>
          <Link href="./studyprograms" className="btn">
            Studies
          </Link>
          <Link href="/educationInstitutions" className="btn">
            Education Institutions
          </Link>
        </ContainerBox>
        <ContainerBox title={"Hospital"}>
          <Link href="users//administerEmployees" className="btn">
            Ansatte
          </Link>
          <Link href="./departments" className="btn">
            Avdelinger
          </Link>
          <Link href="./sections" className="btn">
            Seksjoner
          </Link>
        </ContainerBox>
        <ContainerBox title={"Internships"}>
          <Link href="/internships" className="btn">
            Internships
          </Link>
          <Link href="/internshipAgreements" className="btn">
            Internship Agreements
          </Link>
        </ContainerBox>
      </div>
    </div>
  );
};

export default AdminLayout;
