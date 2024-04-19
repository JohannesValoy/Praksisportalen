/** @format */

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Trash from "@/../public/Icons/trash";
import Add from "@/../public/Icons/add";
import { PageRequest, PageResponse } from "../_models/pageinition";

type DynamicTableProps = {
  tableName: string;
  headers: Record<string, string>;
  selectedRows: any[];
  setSelectedRows: React.Dispatch<React.SetStateAction<any[]>>;
  onRowClick: (row: any) => void;
  onRowButtonClick: (row: any) => void;
  buttonName: string;
  onAddButtonClick: () => void;
  clickableColumns?: Record<string, (row: any) => void>;
  deleteFunction: (id: string | number) => Promise<any>; // Replace 'any' with the type of the response
  paginateFunction: (request: any) => Promise<PageResponse<any>>; // Replace 'any' with the type of the request
};

const DynamicTable: React.FC<DynamicTableProps> = ({
  tableName = "",
  headers = {},
  selectedRows = [],
  setSelectedRows,
  onRowClick,
  onRowButtonClick,
  buttonName,
  onAddButtonClick,
  clickableColumns = {},
  deleteFunction,
  paginateFunction,
}) => {
  // Ensure rows is always an array
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const [rows, setRows] = useState([]);
  const [sortedBy, setSortedBy] = useState<string>("name");
  const [totalPages, setTotalPages] = useState(0);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const fetch = useCallback(() => {
    const request = {
      page,
      size: pageSize,
      sort: sortedBy,
    };

    paginateFunction(request).then((data) => {
      setTotalPages(data.totalPages);
      if (totalPages < page) {
        setPage(totalPages - 1);
      }
      const rows = data.elements.map((element) => ({
        ...element,
      }));

      setPageSize(data.size);
      setRows(rows);
    });
  }, [page, pageSize, sortedBy, paginateFunction, totalPages]);

  useEffect(() => {
    fetch();
  }, [page, sortedBy, pageSize, fetch]);

  const normalizedRows = Array.isArray(rows) ? rows : [rows];
  const onDelete = async () => {
    if (window.confirm("Are you sure you want to delete these rows?")) {
      try {
        for (const row of selectedRows) {
          await deleteFunction(row.id);
        }
        fetch();
        setSelectedRows([]);
      } catch (err) {
        let errorMessage = "Delete failed: ";
        if (err.message.includes("foreign key constraint")) {
          errorMessage +=
            "Cannot delete because it is referenced by other entities.";
        } else if (Array.isArray(err.message)) {
          errorMessage += err.message.join(", ");
        } else {
          errorMessage += err.message;
        }
        setError(errorMessage);
        setIsModalOpen(true);
      }
    }
  };

  const headerTitles = Object.keys(headers);
  const rowDataKeys = Object.values(headers);

  return (
    <div className="flex flex-col w-full h-full justify-center mt-4 overflow-x-auto p-4">
      <div>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-semibold">List of {tableName}</h1>
          <div>
            <button onClick={onAddButtonClick} className="btn btn-xs btn-ghost">
              <Add
                currentColor="currentColor"
                aria-label={`Add ${tableName}`}
              />
            </button>

            <button
              onClick={(event) => {
                event.stopPropagation();
                onDelete();
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
                      normalizedRows.length > 0 &&
                      selectedRows.length === normalizedRows.length
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(normalizedRows);
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
          {normalizedRows.length === 0 ||
          normalizedRows?.[0]?.message != null ? (
            <tbody>
              <tr>
                <td>
                  {normalizedRows.length === 0
                    ? "No data available."
                    : normalizedRows[0].message}
                </td>
              </tr>
            </tbody>
          ) : (
            normalizedRows.map((row, index) => (
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
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => setPage(page - 1)}
            disabled={page <= 0}
          >
            «
          </button>
          <button className="join-item btn">{page + 1}</button>
          <button
            className="join-item btn"
            onClick={() => setPage(page + 1)}
            disabled={page + 1 >= totalPages}
          >
            »
          </button>
          <select
            className="join-item btn"
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
          </select>
        </div>
      </div>
      {/**Delete Error modal */}
      {isModalOpen && (
        <dialog
          className="fixed inset-0 z-10 overflow-y-auto bg-base-100  border-base-50 rounded-lg text-left sm:align-middle sm:max-w-lg sm:w-full"
          open
          aria-labelledby="modal-title"
        >
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-error sm:mx-0 sm:h-10 sm:w-10">
                {/* Icon or image can be added here */}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-base-content"
                  id="modal-title"
                >
                  Error
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-base-content">{error}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-base-content hover:bg-accent-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DynamicTable;
