/** @format */

"use client";
import SuccessDialog from "@/app/components/SuccessDialog";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  addStudyProgram,
  fetchEducationInstitutions,
  fetchStudyPrograms,
} from "./action";
import Dropdown from "@/app/components/Dropdown";
import ContainerBox from "@/app/components/ContainerBox";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [studyPrograms, setStudyPrograms] = useState([]);
  const [educationInstitutions, setEducationInstitutions] = useState<
    EducationInstitution[]
  >([]);
  const [educationInstitutionID, setEducationInstitutionID] =
    useState<number>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  type EducationInstitution = {
    name: string;
    id: number;
  };

  useEffect(() => {
    if (
      name.trim() === "" ||
      educationInstitutionID === null ||
      studyPrograms.some(
        (sp) => sp.name === name.trim() && sp.eduID === educationInstitutionID
      )
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [name, studyPrograms, educationInstitutionID]);

  useEffect(() => {
    fetchStudyPrograms()
      .then((data) => {
        setStudyPrograms(data);
      })
      .catch((error) => console.error("Failed to fetch Study Programs", error));
  }, []);

  useEffect(() => {
    fetchEducationInstitutions()
      .then((data) => {
        setEducationInstitutions(data);
      })
      .catch((error) =>
        console.error("Failed to fetch Education Institutions", error)
      );
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (educationInstitutionID === null) {
      return;
    }
    const data = {
      name: name.trim(),
      educationInstitution_id: educationInstitutionID,
    };

    addStudyProgram(data);
    setIsModalVisible(true);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <SuccessDialog isModalVisible={isModalVisible} />
      <ContainerBox className="items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5  items-center justify-center"
        >
          <h1 className="flex justify-center text-4xl font-bold">
            Add Study Program
          </h1>

          <input
            type="text"
            placeholder="Study Program Name"
            className="input input-bordered"
            onChange={(e) => setName(e.target.value)}
            value={name}
            maxLength={255}
            aria-label="Set study Program Name"
            required
          />

          <Dropdown
            dropdownName="Education Institution"
            options={educationInstitutions}
            selectedOption={
              educationInstitutions.find(
                (edu) => edu.id === educationInstitutionID
              ) || null
            }
            setSelectedOption={(edu) =>
              setEducationInstitutionID(edu.id as number)
            }
            onSearchChange={() => {
              setEducationInstitutionID(null);
            }}
            renderOption={(edu) => (
              <>
                <div className="w-12 h-12 overflow-hidden"></div>

                <div>{edu.name}</div>
              </>
            )}
          />

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
