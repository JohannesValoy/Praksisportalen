/** @format */

import Image from "next/image";

import DynamicTable from "@/app/components/DynamicTable";
import { paginateSections } from "../sections/action";

export default function ProfilePage({ user }) {
  return (
    <div className="flex flex-row w-full h-full items-center justify-center">
      <div className="flex flex-row gap-20 w-full h-full items-center justify-center p-10 ">
        <div className="flex flex-col gap-5 items-center justify-center">
          <div
            style={{
              width: "15rem",
              height: "15rem",
              overflow: "hidden",
              borderRadius: "50%",
            }}
          >
            <div className="mask mask-squircle w-full h-full overflow-hidden">
              <Image
                src="/example-profile-picture.jpg"
                alt="Description"
                className=" bg-neutral-300 h-full object-cover"
                width={400}
                height={400}
                priority={true} // {false} | {true}
              />
            </div>
          </div>
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
          {user.role === "user" ? (
            <DynamicTable
              tableName={"sections"}
              headers={{
                Name: "name",
                Type: "section_type",
                Department: "department_id",
              }}
              filter={{ hasEmployeeID: user.id }}
              onRowClick={() => {}}
              onRowButtonClick={(row) => {
                window.location.href = `/sections/${row.id}`;
              }}
              buttonName={"Details"}
              readonly={true}
              paginateFunction={paginateSections}
            />
          ) : (
            <> </>
          )}
        </div>
      </div>
    </div>
  );
}
