/** @format */
"use client";

import Dropdown from "@/app/components/Dropdown";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  createInternship,
  createInternshipField,
  fetchInternshipFields,
  fetchInternships,
  fetchSections,
} from "./action";
import SuccessDialog from "@/app/components/SuccessDialog";
import ContainerBox from "@/app/components/ContainerBox";

export default function Page() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isFieldDisabled, setIsFieldDisabled] = useState(true);

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
        console.error("Failed to fetch Internship Fields", error)
      );

    fetchInternships()
      .then((data) => {
        setInternships(data);
      })
      .catch((error) => console.error("Failed to fetch Internships", error));
  }, []);

  const handleAddField = async () => {
    await createInternshipField({ name: newField });
    setInternshipFields([...internshipFields, { name: newField }]);
    setInternshipField(newField);
    setNewField("");
  };

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

    setIsModalVisible(true);
  };

  return (
    <div className="flex flex-col justify-center items-center h-fit w-full">
      <SuccessDialog isModalVisible={isModalVisible} />
      <ContainerBox className="items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-4 w-full justify-center"
        >
          <h1 className="flex justify-center text-4xl font-bold">
            Add Internship
          </h1>

          <input
            type="text"
            placeholder="Internship Name"
            className="input input-bordered"
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
              <button type="button" className="btn btn-primary ">
                Add Section
              </button>
            </div>
          </div>
          <div>
            <p>Internship Field</p>
            <Dropdown
              dropdownName="Choose section Type"
              options={internshipFields}
              selectedOption={
                internshipFields.find(
                  (field) => field.name === internshipField
                ) || null
              }
              setSelectedOption={(field) => setInternshipField(field.name)}
              onSearchChange={() => setInternshipField(null)}
              renderOption={(field) => <>{field.name}</>}
            />
            <div className="flex flex-row mt-2">
              <input
                type="text"
                value={newField}
                onChange={(e) => setNewField(e.target.value)}
                placeholder="Enter new section type"
                className="input input-bordered w-full"
              />
              <button
                type="button"
                className="btn btn-secondary h-full"
                onClick={handleAddField}
                disabled={isFieldDisabled}
              >
                Add new type
              </button>
            </div>
          </div>
          <label className="form-control w-full mb-2">
            <div className="label">
              <span className="label-text text-xl">Current max capacity</span>
            </div>
            <input
              type="number"
              placeholder="Current max capacity"
              className="input input-bordered w-full"
              onChange={(e) => setCurrentCapacity(Number(e.target.value))}
              aria-label="Set Current max capacity"
              min={0}
              required
            />
          </label>
          <label className="form-control w-full mb-2">
            <div className="label">
              <span className="label-text text-xl">Max Capacity</span>
            </div>
            <input
              type="number"
              placeholder="Max Capacity"
              className="input input-bordered w-full"
              onChange={(e) => setMaxCapacity(Number(e.target.value))}
              aria-label="Set Max Capacity"
              min={0}
              required
            />
          </label>
          <label className="form-control w-full mb-2">
            <div className="label">
              <span className="label-text text-xl">Number of Beds</span>
            </div>
            <input
              type="number"
              placeholder="Number of Beds"
              className="input input-bordered w-full"
              onChange={(e) => setNumberOfBeds(Number(e.target.value))}
              aria-label="Set Number of Beds"
              defaultValue={0}
              min={0}
            />
          </label>
          <label className="form-control w-full mb-2">
            <div className="label">
              <span className="label-text text-xl">Year of Study</span>
            </div>
            <input
              type="number"
              placeholder="Year of Study"
              className="input input-bordered w-full"
              onChange={(e) => setYearOfStudy(Number(e.target.value))}
              aria-label="Set Year of Study"
              min={0}
              required
            />
          </label>
          <div className="flex flex-row gap-5">
            <button
              type="button"
              className="btn w-20"
              onClick={() => router.back()}
            >
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
  );
}
