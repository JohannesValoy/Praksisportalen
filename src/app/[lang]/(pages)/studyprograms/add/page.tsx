/** @format */

"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [educationInstitution_id, setEducationInstitution_id] = useState("");

  const [educationInstitutions, setEducationInstitutions] = useState<
    EducationInstitution[]
  >([]);
  type EducationInstitution = {
    name: string;
    email: string;
    id: string;
  };

  useEffect(() => {
    fetch(`/api/educationInstitutions`) // Adjusted the fetch URL to match backend routing.
      .then((res) => res.json())
      .then((data) => setEducationInstitutions(data)) // Ensure proper data handling.
      .catch((error) =>
        console.error("Failed to fetch educationInstitutions", error)
      ); // Error handling.
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/studyPrograms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, educationInstitution_id }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    router.back();
  };
  const selectedEI = educationInstitutions.find(
    (educationInstitution) =>
      educationInstitution.id === educationInstitution_id
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full h-full"
    >
      <div className=" justify-center items-center" style={{ width: "50rem" }}>
        <h1 className="text-3xl flex justify-center">Add Study Program</h1>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Study Program Name</span>
          </div>
          <input
            type="text"
            placeholder="Study Program Name"
            className="input input-bordered w-full"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        {/** Button to activate dropdown */}
        <div className="flex flex-row m-1 gap-2">
          <div className="dropdown dropdown-end w-full">
            <div tabIndex={0} role="button" className="btn w-full h-full">
              {selectedEI ? (
                <div className="flex flex-row justify-start items-center gap-5 w-full p-3">
                  <div>{selectedEI.name}</div>
                  <div>{selectedEI.email}</div>
                </div>
              ) : (
                "Education Institution"
              )}
            </div>
            {/** List inside dropdown */}
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-full"
            >
              {educationInstitutions.map((educationInstitution, index) => (
                <div key={index} className="m-2 p-1">
                  <div
                    onClick={() =>
                      setEducationInstitution_id(educationInstitution?.id)
                    }
                    className="btn w-full flex flex-row justify-start items-center p-2 h-fit"
                  >
                    <div>{educationInstitution.name}</div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
          <button>
            <a
              href={`/educationInstitutions/add`}
              className="btn btn-primary h-full p-5"
            >
              Add Education Institution
            </a>
          </button>
        </div>
        <div className="flex w-full justify-center p-10 gap-5">
          <button
            type="button"
            className="btn w-20"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary w-20">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
