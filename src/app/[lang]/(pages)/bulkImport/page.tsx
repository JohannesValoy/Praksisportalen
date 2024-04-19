"use client";
import React, { useState } from "react";
import { createRecord } from "./actions";
import ContainerBox from "@/app/components/ContainerBox";

const InternshipUploader = () => {
  const [file, setFile] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

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
      await createRecord(table, recordData);
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
      setLoading(true);
      setResponses([]);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const data = await parseCSV(text);
        const responses = await Promise.all(data.map((item) => sendData(item)));
        setResponses(responses);
        setLoading(false);
      };
      reader.readAsText(file);
    }
  };

  return (
    <ContainerBox>
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex flex-row justify-center mx-auto p-4">
          <input
            aria-label="file input"
            id="fileInput"
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handleFileChange}
            accept=".csv"
          />
          <button onClick={handleUpload} className="btn btn-primary">
            Upload
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col items-center">
            {responses.map((response, index) => (
              <p key={index}>
                {response.status === 200 ? (
                  <span className="text-success">{response.statusText}</span>
                ) : (
                  <span className="text-error">{response.statusText}</span>
                )}
              </p>
            ))}
          </div>
        )}
      </div>
    </ContainerBox>
  );
};

export default InternshipUploader;
