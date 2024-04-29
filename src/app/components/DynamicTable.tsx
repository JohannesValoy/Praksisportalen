/** @format */
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
  onRowButtonClick: (row: any) => void;
  buttonName: string;
  onAddButtonClick: () => void;
  clickableColumns?: Record<string, (row: any) => void>;
  deleteFunction: (id: string | number) => Promise<any>;
  paginateFunction: (request: any) => Promise<PageResponse<any>>;
  params?: any;
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
  params,
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
    console.log({ params }.toString());

    const request = {
      page,
      size: pageSize,
      sort: sortedBy,
    };

    if (!params || params.length === 0) {
      const filter = searchParams.keys();

      console.log("filter: " + filter);
      let key = filter.next();
      let i = 0;
      while (key && i < 100) {
        request[key.value] = searchParams.get(key.value);
        key = filter.next();
        i++;
      }
    } else {
      const currParams = params.keys();
      let key = currParams.next();
      let i = 0;
      while (key && i < 100) {
        request[key.value] = searchParams.get(key.value);
        key = currParams.next();
        i++;
      }
    }
    console.log(request);

    paginateFunction(request).then((data) => {
      totalPages.current = data.totalPages;
      if (totalPages.current < page) {
        setPage(totalPages.current - 1);
      }
      const rows = data.elements.map((element) => ({
        ...element,
      }));
      setRows(rows);
      setSelectedRows([]);
    });
  }, [page, pageSize, sortedBy, paginateFunction, searchParams]);

  useEffect(() => {
    fetch();
  }, [fetch]); // fetch is a dependency

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
    <div className="flex flex-col justify-center items-center bg-base-300 p-5 rounded-2xl gap-5 w-full">
      <div className="w-full">
        <div className="flex rounded-lg bg-base-200 flex-row justify-between items-center w-full p-4">
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
        <table className="table ">
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
                    onClick={() => setSortedBy(rowDataKeys[index])}
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
            onClick={() => setPage(0)}
            disabled={page <= 0}
          >
            ««
          </button>
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
            disabled={page + 1 >= totalPages.current}
          >
            »
          </button>
          <button
            className="join-item btn"
            onClick={() => setPage(totalPages.current - 1)}
            disabled={page + 1 >= totalPages.current}
          >
            »»
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
        <ErrorModal
          message={error}
          setIsModalOpen={setIsModalOpen}
        ></ErrorModal>
      )}
    </div>
  );
};

export default DynamicTable;
