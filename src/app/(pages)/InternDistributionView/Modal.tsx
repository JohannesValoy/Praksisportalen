/** @format */
/**
 * From https://medium.com/@dtulpa16/next-js-modals-made-easy-7bdce15b2a5e
 */

function Modal({ setShow, Field }: { setShow: any; Field: any }) {
  console.log(Field);
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-fit shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">
            Distribuer Studenter på praksisplasser
          </h3>
          <div className="mt-2 px-7 py-3">
            <ListOfInternships Field={Field} />
          </div>
          <div className="flex justify-center mt-4">
            {/* Navigates back to the base URL - closing the modal */}
            <button
              onClick={() => setShow(false)}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

import DynamicTable from "@/app/components/DynamicTable";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ListOfInternships = ({ Field }: { Field: any }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("section_id");
  const [internships, setInternships] = useState<Internship[]>([]);
  const [selectedRows, setSelectedRows] = useState<Internship[]>([]);
  const headers = {
    Name: "name",
    "Max Capacity": "maxCapacity",
    "Current Capacity": "currentCapacity",
    Field: "field",
  };
  const [sortedBy, setSortedBy] = useState<string>("name");
  const clickableColumns = {
    employee_email: (row) => {
      window.location.href = `/profile/?id=${row.employee_id}`;
    },
  };

  useEffect(() => {
    const fetchUrl =
      id !== null
        ? `/api/DistributeInterns/AvailableInternshipSpots?Field=${Field}`
        : "/api/internships";

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          // If data.elements is present, map over it to create a new array
          // where each element is a flattened version of the original element.
          // If data.elements is not present, use data directly.
          const rows = data.elements
            ? data.elements.map((element) => ({
                ...element,
              }))
            : [
                {
                  ...data,
                },
              ];

          setInternships(rows);
        }
      });
  }, [Field, id, sortedBy]);

  type Internship = {
    name: string;
    id: string;
    employee_id: string;
    employee_email: string;
  };

  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        rows={internships}
        tableName="Internships"
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          window.location.href = `/internships/individualInternship?internship_id=${row.id}`;
        }}
        buttonName={"Details"}
        onAddButtonClick={() => {
          window.location.href = `/internships/addInternship`;
        }}
        clickableColumns={clickableColumns}
        setSortedBy={setSortedBy}
        url={"/api/internships/"}
        setRows={setInternships}
      />
    </div>
  );
};
