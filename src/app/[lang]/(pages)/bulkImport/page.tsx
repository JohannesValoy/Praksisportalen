/** @format */
"use client";
import React, { useState } from "react";
import axios from "axios";

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

  // Select API endpoint based on the "table" value
  const getApiEndpoint = (tableValue) => {
    switch (tableValue) {
      case "internship":
        return "/api/internships";
      case "section":
        return "/api/sections";
      // Add other cases as needed
      default:
        return "/api/default"; // Default endpoint or handling error
    }
  };

  // API request function adapted for dynamic endpoint usage
  const sendInternshipData = async (internship) => {
    console.log(internship.table);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/${internship.table}`,
        internship
      );
      return response;
    } catch (error) {
      return error.response || { status: 500, statusText: "Server Error" };
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const internships = await parseCSV(text);
        const responses = await Promise.all(
          internships.map((internship) => sendInternshipData(internship))
        );
        setResponses(responses);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <input
        id="fileInput"
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={handleFileChange}
        accept=".csv"
      />
      <button onClick={handleUpload} className="btn btn-secondary mt-2">
        Send Data
      </button>
      <div>
        {responses.map((response, index) => (
          <div key={index} className="alert alert-info">
            Response for entry {index + 1}: {response.status}{" "}
            {response.statusText} + {console.log(response)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipUploader;
