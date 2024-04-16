/** @format */

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Trash from "@/../public/Icons/trash";
import Add from "@/../public/Icons/add";

function DynamicTable({
  rows = [],
  setRows,
  tableName = "",
  headers = {},
  selectedRows = [],
  setSelectedRows,
  onRowClick,
  onRowButtonClick,
  buttonName,
  onAddButtonClick,
  clickableColumns = {},
  setSortedBy,
  url = "",
  setPage,
}: {
  rows?: Array<any>;
  setRows?: React.Dispatch<React.SetStateAction<any[]>>;
  tableName?: string;
  headers?: Record<string, string>;
  selectedRows?: Array<any>;
  setSelectedRows?: React.Dispatch<React.SetStateAction<any[]>>;
  onRowClick?: (row: any) => void;
  onRowButtonClick?: (row: any) => void;
  buttonName?: string;
  onAddButtonClick?: () => void;
  clickableColumns?: Record<string, (row: any) => void>;
  setSortedBy?: (sortedBy: string) => void;
  url?: string;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
} = {}) {
  // Ensure rows is always an array
  const normalizedRows = Array.isArray(rows) ? rows : [rows];

  const toggleSelection = (row, event) => {
    event.stopPropagation();
    const isSelected = selectedRows.includes(row);
    if (isSelected) {
      setSelectedRows(
        selectedRows.filter((selectedRow) => selectedRow !== row)
      );
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  const headerTitles = Object.keys(headers);
  const rowDataKeys = Object.values(headers);

  const onDeleteButtonClicked = () => {
    Promise.all(
      selectedRows.map((row) =>
        fetch(`${url + row.id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Failed to delete row with id ${row.id}`);
            }
            return res.json();
          })
          .catch((error) => {
            console.error(error);
            return { success: false, id: row.id };
          })
      )
    ).then((results) => {
      const failedDeletes = results.filter((result) => !result.success);
      if (failedDeletes.length > 0) {
        alert(
          `Failed to delete rows with ids ${failedDeletes
            .map((result) => result.id)
            .join(", ")}`
        );
      } else {
        setRows(
          normalizedRows.filter(
            (currRow) => !selectedRows.find((row) => row.id === currRow.id)
          )
        );
      }
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = normalizedRows.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(normalizedRows.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1); // reset to first page when data changes
  }, [normalizedRows]);

  return (
    <div className="flex flex-col w-full h-full justify-center mt-4 overflow-x-auto p-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-semibold">List of {tableName}</h1>
        <div>
          <button onClick={onAddButtonClick} className="btn btn-xs btn-ghost">
            <Add currentColor="currentColor" aria-label={`Add ${tableName}`} />
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation();
              onDeleteButtonClicked();
            }}
            className="btn btn-ghost btn-xs"
          >
            <Trash currentColor="currentColor" />
          </button>
        </div>
      </div>
      <table className="table my-4">
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={
                    currentItems.length > 0 &&
                    selectedRows.length === currentItems.length
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(currentItems);
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                />
              </label>
            </th>
            {headerTitles.map((title, index) => (
              <th key={index}>
                <div
                  onClick={() => setSortedBy(headerTitles[title])}
                  className="btn btn-ghost btn-xs"
                >
                  {title}
                </div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        {currentItems.length === 0 || currentItems?.[0]?.message != null ? (
          <tbody>
            <tr>
              <td>
                {currentItems.length === 0
                  ? "No data available."
                  : currentItems[0].message}
              </td>
            </tr>
          </tbody>
        ) : (
          currentItems.map((row, index) => (
            <tbody key={index}>
              <tr onClick={() => onRowClick(row)}>
                <th onClick={(e) => e.stopPropagation()}>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={(e) => toggleSelection(row, e)}
                    />
                  </label>
                </th>
                {rowDataKeys.map((key: string, index: number) => (
                  <td
                    key={index}
                    onClick={
                      clickableColumns[key]
                        ? () => clickableColumns[key](row)
                        : undefined
                    }
                  >
                    <div
                      className={
                        clickableColumns[key] ? "btn btn-ghost btn-xs" : ""
                      }
                    >
                      {row[key]}
                    </div>
                  </td>
                ))}
                <td>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      onRowButtonClick(row);
                    }}
                    className="btn btn-ghost btn-xs"
                  >
                    {buttonName}
                  </button>
                </td>
              </tr>
            </tbody>
          ))
        )}
      </table>

      <div className="flex justify-center items-center join">
        <button
          className="join-item btn"
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`join-item btn ${currentPage === number ? "btn-primary" : ""}`}
            onClick={() => setPage(number)}
          >
            {number}
          </button>
        ))}
        <button
          className="join-item btn"
          onClick={() => setPage(currentPage + 1)}
        >
          »
        </button>
      </div>

      <div>
        <label>
          Items per page:
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            {[5, 10, 20, 30, 40, 50].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

export default DynamicTable;
