"use client";

import Dropdown from "@/app/components/Dropdowns/Dropdown";
import { useEffect, useState } from "react";
import {
  createInternship,
  createInternshipField,
  fetchInternshipFields,
  fetchInternships,
  fetchSections,
} from "../../[lang]/(pages)/internships/add/action";
import ContainerBox from "@/app/components/ContainerBox";
import AddSection from "./AddSectionModal";

type Props = {
  openModal: boolean;
  onClose: () => void;
};

/**
 * The AddInternship component displays a form to add an internship.
 * @param root The root object.
 * @param root.openModal The openModal flag.
 * @param root.onClose The onClose function.
 * @returns A form to add an internship.
 */
export default function AddInternship({ openModal, onClose }: Readonly<Props>) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isFieldDisabled, setIsFieldDisabled] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [sections, setSections] = useState([]);
  const [sectionID, setSectionID] = useState(null);

  const [internships, setInternships] = useState([]);
  const [name, setName] = useState("");

  const [internshipFields, setInternshipFields] = useState([]);
  const [internshipField, setInternshipField] = useState(null);
  const [newField, setNewField] = useState("");

  const [maxCapacity, setMaxCapacity] = useState(0);
  const [currentCapacity, setCurrentCapacity] = useState(0);
  const [numberOfBeds, setNumberOfBeds] = useState(0);
  const [yearOfStudy, setYearOfStudy] = useState(0);

  useEffect(() => {
    if (
      name.trim() === "" ||
      internships.some((intern) => intern.name === name.trim()) ||
      internshipField === null ||
      sectionID === null
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [name, internships, internshipField, sectionID]);

  useEffect(() => {
    if (newField.trim() === "") {
      setIsFieldDisabled(true);
    } else {
      setIsFieldDisabled(false);
    }
  }, [newField]);

  useEffect(() => {
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

    fetchInternships()
      .then((data) => {
        setInternships(data);
      })
      .catch((error) => console.error("Failed to fetch Internships", error));
  }, [refreshKey]);

  /**
   * The handleAddField function adds a new internship field.
   */
  const handleAddField = async () => {
    await createInternshipField({ name: newField });
    setInternshipFields([...internshipFields, { name: newField }]);
    setInternshipField(newField);
    setNewField("");
  };

  /**
   * The handleSubmit function adds a new internship.
   * @param event The event object.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name,
      sectionID,
      internshipField,
      maxCapacity,
      currentCapacity,
      numberOfBeds,
      yearOfStudy,
    };

    await createInternship(data);
    onClose();
  };

  /**
   * The closeAddModal function closes the add internship modal.
   */
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" />
      <dialog
        open={openModal === true}
        className="modal modal-bottom sm:modal-middle lg:modal-lg xl:modal-xl"
      >
        {isAddModalOpen && (
          <AddSection openModal={isAddModalOpen} onClose={closeAddModal} />
        )}
        <div className="flex justify-center items-center ">
          <ContainerBox className="items-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 p-4 w-full justify-center overflow-y-auto"
            >
              <div className="flex flex-col gap-2">
                <h1 className="flex justify-center text-4xl font-bold">
                  Add Internship
                </h1>

                <input
                  type="text"
                  placeholder="Internship Name"
                  className="input input-bordered text-base-content"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  maxLength={255}
                  aria-label="Set Internship Name"
                  required
                />
                <div>
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
                    <button
                      type="button"
                      className="btn btn-primary "
                      onClick={() => {
                        setIsAddModalOpen(true);
                      }}
                    >
                      Add Section
                    </button>
                  </div>
                </div>
                <div>
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
                  <div className="flex flex-row mt-2">
                    <input
                      type="text"
                      value={newField}
                      onChange={(e) => setNewField(e.target.value)}
                      placeholder="New Internship Field"
                      className="input input-bordered text-base-content w-full"
                    />
                    <button
                      type="button"
                      className="btn btn-secondary h-full"
                      onClick={handleAddField}
                      disabled={isFieldDisabled}
                    >
                      Add new Field
                    </button>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-full">
                      <p>Current max capacity</p>
                      <input
                        type="number"
                        placeholder="Current max capacity"
                        className="input input-bordered text-base-content w-full"
                        onChange={(e) =>
                          setCurrentCapacity(Number(e.target.value))
                        }
                        aria-label="Set Current max capacity"
                        min={0}
                        required
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <p>Max Capacity</p>
                      <input
                        type="number"
                        placeholder="Max Capacity"
                        className="input input-bordered text-base-content w-full"
                        onChange={(e) => setMaxCapacity(Number(e.target.value))}
                        aria-label="Set Max Capacity"
                        min={0}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <p>Number of Beds</p>
                    <input
                      type="number"
                      placeholder="Number of Beds"
                      className="input input-bordered text-base-content w-full"
                      onChange={(e) => setNumberOfBeds(Number(e.target.value))}
                      aria-label="Set Number of Beds"
                      min={0}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <p>Year of Study</p>
                    <input
                      type="number"
                      placeholder="Year of Study"
                      className="input input-bordered text-base-content w-full"
                      onChange={(e) => setYearOfStudy(Number(e.target.value))}
                      aria-label="Set Year of Study"
                      min={0}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-5 justify-between">
                <button type="button" className="btn w-20" onClick={onClose}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-accent w-20"
                  disabled={isSubmitDisabled}
                >
                  Save
                </button>
              </div>
            </form>
          </ContainerBox>
        </div>
      </dialog>
    </>
  );
}
