"use client";
import React, { useState } from "react";
import { createRecord } from "./actions";

const InternshipUploader = () => {
  const [file, setFile] = useState(null);
  const [responses, setResponses] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Parse CSV Data into JSON
  const parseCSV = async (text) => {
    const lines = text.split("\n").filter((line) => line.trim());
    const headers = lines[0].split(",").map((header) => header.trim());

    return lines.slice(1).map((line) => {
      const values = line.split(",");
      return headers.reduce((object, header, index) => {
        object[header] = values[index] ? values[index].trim() : null;
        return object;
      }, {});
    });
  };

  const sendData = async (data) => {
    try {
      const { table, ...recordData } = data;
      const response = await createRecord(table, recordData);
      return { status: 200, statusText: "Record successfully created" };
    } catch (error) {
      return {
        status: error.response?.status || 500,
        statusText: error.response?.statusText || "Server Error",
      };
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (file) {
      setResponses([]);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const data = await parseCSV(text);
        const responses = await Promise.all(data.map((item) => sendData(item)));
        setResponses(responses);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-center mx-auto p-4">
        <input
          id="fileInput"
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileChange}
          accept=".csv"
        />
        <button onClick={handleUpload} className="btn btn-secondary ">
          Upload
        </button>
      </div>
      <div className="flex flex-col items-center">
        {responses.map((response, index) => (
          <p key={index}>
            {response.status === 200 ? (
              <span style={{ color: "green" }}>{response.statusText}</span>
            ) : (
              <span style={{ color: "red" }}>{response.statusText}</span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
};

export default InternshipUploader;
