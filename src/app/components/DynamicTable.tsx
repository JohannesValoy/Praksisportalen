"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Trash from "@/../public/Icons/trash";
import Add from "@/../public/Icons/add";
import { PageResponse } from "../_models/pageinition";
import { useSearchParams } from "next/navigation";
import ContainerBox from "./ContainerBox";
import ErrorModal from "./ErrorModal";

type DynamicTableProps = {
  tableName: string;
  headers: Record<string, string>;
  onRowClick: (row: any) => void;
  onRowButtonClick?: (row: any) => void;
  buttonName?: string;
  onAddButtonClick?: () => void;
  clickableColumns?: Record<string, (row: any) => void>;
  deleteFunction?: (id: string | number) => Promise<any>;
  paginateFunction: (request: any) => Promise<PageResponse<any>>;
  filter?: Record<string, string>;
  readonly?: boolean;
  refreshKey?: number;
};

const DynamicTable: React.FC<DynamicTableProps> = ({
  tableName = "",
  headers = {},
  onRowClick,
  onRowButtonClick,
  buttonName,
  onAddButtonClick,
  clickableColumns = {},
  deleteFunction,
  paginateFunction,
  filter = {},
  readonly = false,
  refreshKey,
}) => {
  const searchParams = useSearchParams();
  // Ensure rows is always an array
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPages = useRef(0);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

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

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const fetch = useCallback(() => {
    const request = {
      page,
      size: pageSize,
      sort: sortedBy,
    };

    if (Object.keys(filter).length > 0) {
      // If filter is not empty, use it to filter the data
      for (const key in filter) {
        request[key] = filter[key];
      }
    } else {
      // If filter is empty, use searchParams to filter the data
      const filter = searchParams.keys();
      let key = filter.next();
      let i = 0;
      while (key && i < 100) {
        request[key.value] = searchParams.get(key.value);
        key = filter.next();
        i++;
      }
    }

    paginateFunction(request).then((data) => {
      totalPages.current = data?.totalPages;
      if (totalPages.current < page) {
        console.log("Setting page to", totalPages.current - 1);
        setPage(totalPages.current - 1);
      }
      const rows = data.elements.map((element) => {
        const newElement = { ...element };
        for (const prop in newElement) {
          if (newElement[prop] instanceof Date) {
            newElement[prop] = newElement[prop].toLocaleDateString();
          }
        }
        return newElement;
      });
      setRows(rows);
      setSelectedRows([]);
    });
  }, [page, pageSize, sortedBy, paginateFunction, searchParams, filter]);

  useEffect(() => {
    fetch();
  }, [page, refreshKey]); // fetch is a dependency

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
    <>
      <ContainerBox>
        <div className="flex bg-neutral flex-row justify-between items-center w-full p-4">
          <h1 className="text-3xl font-semibold">List of {tableName}</h1>
          {!readonly && (
            <div>
              <button
                onClick={onAddButtonClick}
                className="btn btn-xs btn-ghost"
                aria-label={`Add ${tableName}`}
              >
                <Add currentColor="currentColor" />
              </button>

              <button
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete();
                }}
                className="btn btn-ghost btn-xs"
                aria-label="Delete"
              >
                <Trash currentColor="currentColor" />
              </button>
            </div>
          )}
        </div>
        <table className="table text-center">
          <thead>
            <tr>
              {!readonly && (
                <td>
                  <input
                    type="checkbox"
                    className="checkbox"
                    aria-label="Select all rows"
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
                </td>
              )}
              {headerTitles.map((title, index) => (
                <th key={`${title}-${index}`}>
                  <button
                    onClick={() => setSortedBy(rowDataKeys[index])}
                    className="btn btn-ghost text-neutral-content btn-xs"
                  >
                    {title}
                  </button>
                </th>
              ))}
              <td></td>
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
                  {!readonly && (
                    <td onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="checkbox"
                        aria-label="Select this row"
                        checked={selectedRows.includes(row)}
                        onChange={(e) => toggleSelection(row, e)}
                      />
                    </td>
                  )}
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
                          clickableColumns[key]
                            ? "btn btn-ghost text-neutral-content btn-xs"
                            : ""
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
                      className="btn btn-ghost text-neutral-content btn-xs"
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
            className="join-item btn btn-neutral"
            onClick={() => setPage(0)}
            disabled={page <= 0}
          >
            ««
          </button>
          <button
            className="join-item btn btn-neutral"
            onClick={() => setPage(page - 1)}
            disabled={page <= 0}
          >
            «
          </button>
          <button
            className="join-item btn btn-neutral"
            style={{ pointerEvents: "none" }}
          >
            {page + 1}
          </button>
          <button
            className="join-item btn btn-neutral"
            onClick={() => setPage(page + 1)}
            disabled={page + 1 >= totalPages.current}
          >
            »
          </button>
          <button
            className="join-item btn btn-neutral"
            onClick={() => setPage(totalPages.current - 1)}
            disabled={page + 1 >= totalPages.current}
          >
            »»
          </button>
          <select
            className="join-item btn btn-neutral"
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
          </select>
        </div>
      </ContainerBox>
      {/**Delete Error modal */}
      {isModalOpen && (
        <ErrorModal
          message={error}
          setIsModalOpen={setIsModalOpen}
        ></ErrorModal>
      )}
    </>
  );
};

export default DynamicTable;
