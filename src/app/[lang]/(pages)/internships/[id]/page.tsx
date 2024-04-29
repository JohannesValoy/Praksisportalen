/** @format */

"use client";

import { useEffect, useState } from "react";
import Gantt from "@/app/components/Gantt";
import { editDetails, getIndividualInternship } from "./actions";
import NotFound from "@/app/components/NotFound";
import Dropdown from "@/app/components/Dropdown";
import { fetchInternshipFields, fetchSections } from "../add/action";
import DynamicTable from "@/app/components/DynamicTable";
import {
  deleteInternshipAgreement,
  paginateInternshipAgreements,
} from "../../internshipAgreements/actions";

type DataItem = {
  id: number;
  row_id: number;
  name: string;
  startDate: Date;
  endDate: Date;
};

const InternshipComponent = ({ params }: { params: { id: number } }) => {
  const [datalist, setDatalist] = useState<DataItem[]>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [internship, setInternship] = useState<any>(null);
  const [name, setName] = useState("");

  const [sections, setSections] = useState([]);
  const [sectionID, setSectionID] = useState(null);

  const [internshipFields, setInternshipFields] = useState([]);
  const [internshipField, setInternshipField] = useState(null);

  const [maxCapacity, setMaxCapacity] = useState(null);
  const [currentCapacity, setCurrentCapacity] = useState(null);
  const [numberOfBeds, setNumberOfBeds] = useState(null);
  const [yearOfStudy, setYearOfStudy] = useState(null);

  useEffect(() => {
    if (params.id !== null) {
      getIndividualInternship(params.id)
        .then((data) => {
          setInternship(data);
          const dataList: DataItem[] = data.timeIntervals.map(
            (interval: any, index: number) => ({
              id: index + 1,
              row_id: interval.id,
              name: `Interval ${index + 1}`,
              startDate: new Date(interval.startDate),
              endDate: new Date(interval.endDate),
            })
          );
          setDatalist(dataList);
        })
        .catch((error) => {
          console.error("Failed to fetch internship details:", error);
          setNotFound(true);
        });
      fetchSections()
        .then((data) => {
          setSections(data);
        })
        .catch((error) => console.error("Failed to fetch Sections", error));
      fetchInternshipFields()
        .then((data) => {
          setInternshipFields(data);
        })
        .catch((error) =>
          console.error("Failed to fetch Internship Fields", error)
        );
    }
  }, [params]);

  if (notFound) {
    return <NotFound />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const update: { [key: string]: any } = {};

    if (name) update.name = name;
    if (sectionID) update.section_id = sectionID;
    if (internshipField) update.internshipField = internshipField;
    if (maxCapacity) update.maxCapacity = maxCapacity;
    if (currentCapacity) update.currentCapacity = currentCapacity;
    if (numberOfBeds) update.numberOfBeds = numberOfBeds;
    if (yearOfStudy) update.yearOfStudy = yearOfStudy;

    await editDetails(params.id, update);

    refreashPage();
  };

  const refreashPage = () => {
    window.location.reload();
  };

  return (
    <>
      {internship ? (
        <div className="flex flex-col w-full gap-6 p-10">
          <div className="flex flex-col ">
            <div className="flex flex-row ">
              <h1>{internship?.name}</h1>
              <button className="btn btn-sm" onClick={() => setShowModal(true)}>
                edit
              </button>
              <dialog open={showModal === true} className="modal">
                <div className="modal-box">
                  <div className="flex flex-row justify-between w-full">
                    <h2 className="font-bold text-lg">
                      Edit {internship?.name}
                    </h2>
                    <button
                      onClick={() => setShowModal(false)}
                      type="button"
                      className="btn btn-error btn-sm btn-circle"
                    >
                      x
                    </button>
                  </div>

                  <div className="modal-action">
                    <form
                      className="w-full"
                      method="dialog"
                      onSubmit={handleSubmit}
                    >
                      <div className="flex flex-col items-center w-full gap-6">
                        <label className="form-control w-full ">
                          <div className="label">
                            <span className="label-text">Name</span>
                          </div>
                          <input
                            type="text"
                            placeholder="Internship Name"
                            className="input input-bordered"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            maxLength={255}
                            aria-label="Set Internship Name"
                          />
                        </label>
                        <div className="w-full">
                          <p>Section</p>
                          <div className="flex flex-row mb-2 ">
                            <Dropdown
                              dropdownName="Choose section"
                              options={sections}
                              selectedOption={
                                sections.find((sc) => sc.id === sectionID) ||
                                null
                              }
                              setSelectedOption={(sc) => setSectionID(sc.id)}
                              onSearchChange={() => setSectionID(null)}
                              renderOption={(section) => <>{section.name}</>}
                            />
                          </div>
                        </div>
                        <div className="w-full">
                          <p>Internship Field</p>
                          <Dropdown
                            dropdownName="Choose section Type"
                            options={internshipFields}
                            selectedOption={
                              internshipFields.find(
                                (field) => field.name === internshipField
                              ) || null
                            }
                            setSelectedOption={(field) =>
                              setInternshipField(field.name)
                            }
                            onSearchChange={() => setInternshipField(null)}
                            renderOption={(field) => <>{field.name}</>}
                          />
                        </div>
                        <label className="form-control w-full mb-2">
                          <div className="label">
                            <span className="label-text text-xl">
                              Current max capacity
                            </span>
                          </div>
                          <input
                            type="number"
                            placeholder="Current max capacity"
                            className="input input-bordered w-full"
                            onChange={(e) =>
                              setCurrentCapacity(Number(e.target.value))
                            }
                            aria-label="Set Current max capacity"
                          />
                        </label>
                        <label className="form-control w-full mb-2">
                          <div className="label">
                            <span className="label-text text-xl">
                              Max Capacity
                            </span>
                          </div>
                          <input
                            type="number"
                            placeholder="Max Capacity"
                            className="input input-bordered w-full"
                            onChange={(e) =>
                              setMaxCapacity(Number(e.target.value))
                            }
                            aria-label="Set Max Capacity"
                          />
                        </label>
                        <label className="form-control w-full mb-2">
                          <div className="label">
                            <span className="label-text text-xl">
                              Number of Beds
                            </span>
                          </div>
                          <input
                            type="number"
                            placeholder="Number of Beds"
                            className="input input-bordered w-full"
                            onChange={(e) =>
                              setNumberOfBeds(Number(e.target.value))
                            }
                            aria-label="Set Number of Beds"
                          />
                        </label>
                        <label className="form-control w-full mb-2">
                          <div className="label">
                            <span className="label-text text-xl">
                              Year of Study
                            </span>
                          </div>
                          <input
                            type="number"
                            placeholder="Year of Study"
                            className="input input-bordered w-full"
                            onChange={(e) =>
                              setYearOfStudy(Number(e.target.value))
                            }
                            aria-label="Set Year of Study"
                          />
                        </label>

                        <div className="flex flex-row justify-end w-full">
                          <button
                            type="submit"
                            className="btn btn-accent"
                            disabled={
                              !name &&
                              !sectionID &&
                              !internshipField &&
                              !maxCapacity &&
                              !currentCapacity &&
                              !numberOfBeds &&
                              !yearOfStudy
                            }
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
            <p>Section: {internship.sectionName}</p>
            <p>Field: {internship.internshipField}</p>
            <p>Max Capacity: {internship.maxCapacity}</p>
            <p>Current Capacity: {internship.currentCapacity}</p>
            <p>Number of Beds: {internship.numberOfBeds}</p>
            <p>Year of Study: {internship.yearOfStudy}</p>
          </div>
          <div className="flex flex-row w-full justify-center">
            <Gantt datalist={datalist} onClickUrl={"/profile?id="} />
          </div>
          <DynamicTable
            tableName={"Internship Agreements"}
            headers={{
              status: "status",
              "Start Date": "startDate",
              "End Date": "endDate",
            }}
            onRowClick={() => {}}
            onRowButtonClick={(row) => {
              window.location.href = `/internshipAgreements/${row.id}`;
            }}
            buttonName={"Details"}
            deleteFunction={deleteInternshipAgreement}
            paginateFunction={paginateInternshipAgreements}
          />
        </div>
      ) : (
        <p>Loading internship details...</p>
      )}
    </>
  );
};

export default InternshipComponent;
