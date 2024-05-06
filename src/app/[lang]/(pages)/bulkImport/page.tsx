"use client";
import React, { useState } from "react";
import { createRecord } from "./actions";
import ContainerBox from "@/app/_components/ContainerBox";

/**
 * The Page component is the bulk import page.
 * @returns The Bulk Import page.
 */
export default function Page() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  /**
   * The parseCSV function parses the CSV text.
   * @param text The CSV text.
   * @returns The parsed CSV data.
   */
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

  /**
   * The sendData function sends data to the server.
   * @param data The data to send.
   * @returns The response from the server.
   */
  const sendData = async (data) => {
    try {
      const { table, ...recordData } = data;
      const newRecord = await createRecord(table, recordData);
      return {
        status: 200,
        statusText: "Record successfully created",
        record: newRecord[0],
      };
    } catch (error) {
      return {
        status: error.response?.status || 500,
        statusText: error.response?.statusText || "Server Error",
      };
    }
  };

  /**
   * The handleUpload function handles the file upload.
   */
  const handleUpload = async () => {
    if (file && !loading) {
      setLoading(true);
      setUploaded(false);
      setProgress(0);
      setResponses([]);
      let successCount = 0;
      let failureCount = 0;
      const failedRecords = [];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const data = await parseCSV(text);
        Promise.all(
          data.map(async (item) => {
            const response = await sendData(item);
            if (response.status === 200) {
              successCount++;
            } else {
              failureCount++;
              failedRecords.push({ record: item, error: response.statusText });
            }
            setProgress(((successCount + failureCount) / data.length) * 100);
          })
        ).finally(() => {
          setLoading(false);
          setUploaded(true);
          setResponses([
            {
              status: 200,
              message: `${successCount} records added successfully, ${failureCount} records failed.`,
              failedRecords,
            },
          ]);
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
            {"File uploaded: " + file?.name}
          </p>
        ) : null}
        <div className="flex flex-col items-center">
          {responses.map((response, index) => (
            <div key={index}>
              <p>{response.message}</p>
              {response.failedRecords.length > 0 && (
                <div>
                  <p className="font-bold">Failed Records:</p>
                  <ul>
                    {response.failedRecords.map((failedRecord, i) => (
                      <li key={i}>
                        <p className="text-error">
                          Record: {JSON.stringify(failedRecord.record)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ContainerBox>
  );
}
