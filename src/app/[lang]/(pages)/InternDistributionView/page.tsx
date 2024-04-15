/** @format */

"use client";
import Modal from "./Modal";
import React, { useEffect, useState } from "react";
import DynamicTable from "../../../components/DynamicTable";
import { getInternDistribution } from "./Actions";

const ListOfInternshipAgreements = () => {
  const [showModal, setShowModal] = useState(false);
  const [internshipAgreements, setInternshipAgreements] = useState([]);
  const [field, setField] = useState("");
  const [sortedBy, setSortedBy] = useState<string>("name");
  const [selectedRows, setSelectedRows] = useState([]);
  const headers = {
    containsStatus: "status",
    " Start Date": "startDate",
    "End Date": "endDate",
    Field: "internship_field",
    "Amount of Interns": "amount_of_interns",
  };
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  useEffect(() => {
    const updateAggrements = async () => {
      const aggrements = await getInternDistribution();
      console.log(aggrements);
      setInternshipAgreements(aggrements);
    };
    updateAggrements();
  }, [sortedBy]);

  type InternshipAgreement = {
    name: string;
    id: string;
  };

  if (sortedBy) {
    internshipAgreements.sort((a, b) => {
      if (a[sortedBy] < b[sortedBy]) {
        return -1;
      }
      if (a[sortedBy] > b[sortedBy]) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <DynamicTable
        rows={internshipAgreements}
        tableName="Internship Agreements"
        headers={headers}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={() => {}}
        onRowButtonClick={(row) => {
          setField(row.internship_field);
          setShowModal(true);
        }}
        buttonName={"Distribuer"}
        onAddButtonClick={() => {
          window.location.href = `/admin/administerInternships/addInternship`;
        }}
        setSortedBy={setSortedBy}
        url="/api/internships/"
        setRows={setInternshipAgreements}
      />

      <button
        onClick={() => {
          setField("");
          setShowModal(true);
        }}
      >
        Distribuer alle
      </button>
      {showModal && (
        <Modal
          setShow={setShowModal}
          internship_field={field}
          amount={internshipAgreements.length}
        />
      )}
    </div>
  );
};

export default ListOfInternshipAgreements;
