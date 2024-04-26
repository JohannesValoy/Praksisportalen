"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addEducationInstitution, fetchEducationInstitution } from "./action";
import SuccessDialog from "@/app/components/SuccessDialog";
import ContainerBox from "@/app/components/ContainerBox";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (name.trim() === "" || institution.includes(name)) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [name, institution]);

  useEffect(() => {
    fetchEducationInstitution()
      .then((data) => {
        setInstitution(data);
      })
      .catch((error) => console.error("Failed to fetch Study Programs", error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = name.trim();
    addEducationInstitution(data);
    setIsModalVisible(true);
  };

  return (
    <div className="flex flex-col justify-center items-center h-fit w-full">
      <SuccessDialog isModalVisible={isModalVisible} />
      <ContainerBox className="items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 h-full items-center justify-center"
        >
          <h1 className="flex justify-center text-4xl font-bold">
            Add Education Institution
          </h1>
          <input
            type="text"
            placeholder="Education Institution Name"
            className="input input-bordered "
            aria-label="Education Institution Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={255}
            required
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
