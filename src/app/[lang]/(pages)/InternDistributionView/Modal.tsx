/** @format */
/**
 * From https://medium.com/@dtulpa16/next-js-modals-made-easy-7bdce15b2a5e
 */

import DynamicTable from "@/app/components/DynamicTable";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Modal({
  setShow,
  internship_field,
  amount,
}: {
  setShow: any;
  internship_field: string;
  amount: number;
}) {
  const searchParams = useSearchParams();
  const id = searchParams.get("section_id");
  const [internships, setInternships] = useState<Internship[]>([]);
  const [selectedRows, setSelectedRows] = useState<Internship[]>([]);
  const [sortedBy, setSortedBy] = useState<string>("name");
  const clickableColumns = {
    employee_email: (row) => {
      window.location.href = `/profile/?id=${row.employee_id}`;
    },
  };
  const headers = {
    Name: "name",
    "Max Capacity": "maxCapacity",
    "Current Capacity": "currentCapacity",
    internship_field: "internship_field",
    "Available Places": "availablePlaces",
  };

  useEffect(() => {
    const fetchUrl = `/api/DistributeInterns/AvailableInternshipSpots?internship_field=${internship_field}`;

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          setInternships(data);
        }
      });
  }, [internship_field, id, sortedBy]);

  function handleAssignIntern(id) {
    if (amount < 2) {
      setShow(false);
    }
    console.log("Assigning intern to internship" + id);
  }

  console.log("in modal: " + internship_field);

  type Internship = {
    name: string;
    id: string;
    employee_id: string;
    employee_email: string;
  };
  console.log(internships);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-fit shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">
            Distribuer Studenter på praksisplasser
          </h3>
          <h4>Antall studenter å distribuere: {amount}</h4>
          <div className="mt-2 px-7 py-3">
            <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
              <DynamicTable
                rows={internships}
                tableName="Internships"
                headers={headers}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                onRowClick={() => {}}
                onRowButtonClick={(row) => {
                  handleAssignIntern(row.id);
                }}
                buttonName={"Assign"}
                onAddButtonClick={() => {
                  window.location.href = `/internships/addInternship`;
                }}
                clickableColumns={clickableColumns}
                setSortedBy={setSortedBy}
                url={"/api/internships/"}
                setRows={setInternships}
              />
            </div>
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
