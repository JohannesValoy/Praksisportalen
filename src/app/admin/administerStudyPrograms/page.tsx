import React from "react";

const StudyProgramForm = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1>Legg til Studieprogram</h1>
      <br />
      <form className="flex justify-center items-center flex-col">
        <label
          htmlFor="name"
          className="input input-bordered flex items-center gap-2"
        >
          Name:
          <input type="text" className="grow" placeholder="Name" />
        </label>
        <br />
        <label htmlFor="educationInstitution">Education Institution:</label>

        <select
          className="btn p-2 shadow flex dropdown-content z-[1] bg-base-100 rounded-box w-52"
          id="educationInstitution"
        >
          <option value="">ingen</option>
        </select>
        <br />
        <button type="submit" className="btn">
          Lagre
        </button>
      </form>
    </div>
  );
};

export default StudyProgramForm;
