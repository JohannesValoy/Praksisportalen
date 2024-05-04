"use client";

import { useEffect, useState } from "react";
import { editDetails } from "./actions";
import Dropdown from "@/app/components/Dropdowns/Dropdown";
import { fetchInternshipFields, fetchSections } from "../add/action";
import DynamicTable from "@/app/components/DynamicTables/DynamicTable";
import {
  deleteInternshipAgreement,
  paginateInternshipAgreements,
} from "../../internshipAgreements/actions";
import EditModal from "@/app/components/Modals/EditModal";

/**
 * The InternshipPage function in TypeScript React is a functional component that renders the
 * InternshipPage component.
 * @param root - The `root` parameter is an object that contains the user, wordbook, and internship details.
 * @param root.user - The `user` parameter is an object that contains the user ID and role.
 * @param root.wordbook - The `wordbook` parameter is an object that contains a key-value pair of words.
 * @param root.internship - The `internship` parameter is an object that contains the internship details.
 * @returns The InternshipPage function returns a JSX Element that displays the InternshipPage component.
 */
export default function InternshipPage({
  user,
  wordbook,
  internship,
}: {
  readonly user: { readonly id: string; readonly role?: string };
  readonly wordbook: { readonly [key: string]: string };
  readonly internship: any;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [name, setName] = useState("");

  const [sections, setSections] = useState([]);
  const [sectionID, setSectionID] = useState(null);
  const sectionName = getSectionName(internship.sectionID || "", sections);

  const [internshipFields, setInternshipFields] = useState([]);
  const [internshipField, setInternshipField] = useState(null);

  const [currentCapacity, setCurrentCapacity] = useState(null);
  const [numberOfBeds, setNumberOfBeds] = useState(null);
  const [yearOfStudy, setYearOfStudy] = useState(null);

  useEffect(() => {
    if (internship.id !== null) {
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
          console.error("Failed to fetch Internship Fields", error),
        );
    }
  }, [internship]);

  /**
   * The function `getSectionName` takes a section ID and an array of sections, and returns the name of
   * the section with the matching ID or "Unknown section" if not found.
   * @param sectionID - The `sectionID` parameter is a string representing the ID of the
   * section you want to find the name for.
   * @param sections - An array of objects where each object contains an `id` (string) and a `name`
   * (string) representing a section.
   * @returns The function `getSectionName` returns the name of the section corresponding to the
   * provided `sectionID` from the `sections` array. If a section with the given `sectionID` is found,
   * it returns the name of that section. If no matching section is found, it returns "Unknown section".
   */
  function getSectionName(
    sectionID: string,
    sections: Array<{ id: string; name: string }>,
  ) {
    const section = sections.find((section) => section.id === sectionID);
    return section ? section.name : "Unknown section";
  }

  /**
   * The handleSubmit function in TypeScript React handles form submission by updating internship
   * details and refreshing the page.
   * @param e - The `e` parameter in the `handleSubmit` function is typically an event object that
   * represents the event that was triggered. In this case, it is used to prevent the default behavior
   * of a form submission using `e.preventDefault()`. This is a common practice in form handling to
   * prevent the page from reloading
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const update: { [key: string]: any } = {};

    if (name) update.name = name;
    if (sectionID) update.sectionID = sectionID;
    if (internshipField) update.internshipField = internshipField;
    if (currentCapacity) update.currentCapacity = currentCapacity;
    if (numberOfBeds) update.numberOfBeds = numberOfBeds;
    if (yearOfStudy) update.yearOfStudy = yearOfStudy;

    await editDetails(internship.id, update);

    refreashPage();
  };

  /**
   * The `refreshPage` function reloads the current window location.
   */
  const refreashPage = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="flex flex-col items-center ">
        <div className="flex flex-row items-start">
          <h1>{internship?.name}</h1>

          <button onClick={() => setShowModal(true)} aria-label="Edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>

          <dialog open={showModal === true} className="modal">
            <div className="modal-box">
              <div className="flex flex-row justify-between w-full">
                <h2 className="font-bold text-lg">Edit</h2>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="btn btn-error btn-sm btn-circle"
                >
                  x
                </button>
              </div>
              <h3 className="text-xl">{internship?.name}</h3>

              <EditModal
                setName={setName}
                handleSubmit={handleSubmit}
                disabled={
                  !name &&
                  !sectionID &&
                  !internshipField &&
                  !currentCapacity &&
                  !numberOfBeds &&
                  !yearOfStudy
                }
              >
                <div className="w-full">
                  <p>Section</p>
                  <div className="flex flex-row mb-2 ">
                    <Dropdown
                      dropdownName="Choose section"
                      options={sections}
                      selectedOption={
                        sections.find((sc) => sc.id === sectionID) || null
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
                    dropdownName="Choose Internship Field"
                    options={internshipFields}
                    selectedOption={
                      internshipFields.find(
                        (field) => field.name === internshipField,
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
                    className="input input-bordered text-base-content w-full"
                    onChange={(e) => setCurrentCapacity(Number(e.target.value))}
                    aria-label="Set Current max capacity"
                  />
                </label>

                <label className="form-control w-full mb-2">
                  <div className="label">
                    <span className="label-text text-xl">Number of Beds</span>
                  </div>
                  <input
                    type="number"
                    placeholder="Number of Beds"
                    className="input input-bordered text-base-content w-full"
                    onChange={(e) => setNumberOfBeds(Number(e.target.value))}
                    aria-label="Set Number of Beds"
                  />
                </label>
                <label className="form-control w-full mb-2">
                  <div className="label">
                    <span className="label-text text-xl">Year of Study</span>
                  </div>
                  <input
                    type="number"
                    placeholder="Year of Study"
                    className="input input-bordered text-base-content w-full"
                    onChange={(e) => setYearOfStudy(Number(e.target.value))}
                    aria-label="Set Year of Study"
                  />
                </label>
              </EditModal>
            </div>
          </dialog>
        </div>
        <p>Section: {sectionName}</p>
        <p>Field: {internship.internshipField}</p>
        <p>Max Capacity: {internship.maxCapacity}</p>
        <p>Current Capacity: {internship.currentCapacity}</p>
        <p>Number of Beds: {internship.numberOfBeds}</p>
        <p>Year of Study: {internship.yearOfStudy}</p>
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
    </>
  );
}
