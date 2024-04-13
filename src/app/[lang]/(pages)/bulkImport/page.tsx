"use client";

import React, { useState } from "react";

const BulkImportPage = () => {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split("\t");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const groupedData = csvRows.reduce((groups, row) => {
      const values = row.split("\t");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});

      const table = obj.table;
      delete obj.table;

      if (!groups[table]) {
        groups[table] = [];
      }

      groups[table].push(obj);

      return groups;
    }, {});

    setArray(groupedData);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (file) {
      fileReader.onload = async function (event) {
        const text = event.target.result;
        await csvFileToArray(text);
      };

      fileReader.onloadend = () => {
        for (const table in array) {
          fetch(`/api/${table}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(array[table]),
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error:", error));
        }
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = [
    new Set<string>(
      Object.values(array)
        .flat()
        .reduce((keys, obj) => [...keys, ...Object.keys(obj)], [])
    ),
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>

      <br />

      <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Object.values(array)
            .flat()
            .map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((val, i) => (
                  <td key={`${index}-${i}`}>{String(val)}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BulkImportPage;
