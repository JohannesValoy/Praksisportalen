"use client";
import React, { useEffect, useState } from "react";
import { createRecord } from "./actions";
import ContainerBox from "@/app/components/ContainerBox";

const InternshipUploader = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [responses, setResponses] = useState([]);
  const [lastupdate, setLastupdate] = useState(new Date().getTime());
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

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
    if (file && !loading) {
      setLoading(true);
      setUploaded(false);
      setProgress(0);
      const responses = [];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const data = await parseCSV(text);
        Promise.all(
          data.map(async (item) => {
            const response = await sendData(item);
            responses.push(response);
            if (lastupdate < new Date().getTime() - 1000) {
              setLastupdate(new Date().getTime());
              setResponses([...responses]);
              setProgress((progress) => (responses.length * 100) / data.length);
            }
          })
        ).finally(() => {
          setLoading(false);
          setUploaded(true);
          setResponses(responses);
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <ContainerBox>
      <div className="flex flex-col justify-center gap-4 items-center h-full">
        <div className="flex flex-row justify-center mx-auto p-4">
          <input
            aria-label="file input"
            id="fileInput"
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handleFileChange}
            accept=".csv"
          />
          <button
            onClick={handleUpload}
            className="btn btn-primary"
            disabled={loading}
          >
            Upload
          </button>
        </div>
        {loading ? (
          <progress
            className="progress w-56"
            value={progress}
            max="100"
          ></progress>
        ) : uploaded ? (
          <p className="text-success text-xl">
            {"File uploaded: " + file.name}
          </p>
        ) : null}
        <div className="flex flex-col items-center">
          {responses.map((response, index) => (
            <p key={index}>
              {response.status === 500 ? (
                <span className="text-error">{response.statusText}</span>
              ) : null}
            </p>
          ))}
        </div>
      </div>
    </ContainerBox>
  );
};

export default InternshipUploader;
