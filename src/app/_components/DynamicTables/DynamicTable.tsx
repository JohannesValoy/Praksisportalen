"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Trash from "@/../public/Icons/trash";
import Add from "@/../public/Icons/add";
import { PageResponse } from "../../_models/pageinition";
import { useSearchParams } from "next/navigation";
import ContainerBox from "../ContainerBox";
import ErrorModal from "../ErrorModal";

/**
 * The DynamicTableProps interface represents the props of the DynamicTable component.
 */
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
  readOnly?: boolean;
  refreshKey?: number;
};

/**
 * The DynamicTable component displays a dynamic table.
 * @param root The root object.
 * @param root.tableName The name of the table.
 * @param root.headers The headers of the table.
 * @param root.onRowClick The function to handle row click.
 * @param root.onRowButtonClick The function to handle row button click.
 * @param root.buttonName The name of the button.
 * @param root.onAddButtonClick The function to handle add button click.
 * @param root.clickableColumns The clickable columns.
 * @param root.deleteFunction The function to delete a row.
 * @param root.paginateFunction The function to paginate the data.
 * @param root.filter The filter object.
 * @param root.readOnly The readOnly flag.
 * @returns A dynamic table.
 */
export default function DynamicTable({
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
  readOnly = false,
}: Readonly<DynamicTableProps>): React.ReactElement {
  const searchParams = useSearchParams();

  const [error, setError] = useState(null);
  const filters = useRef(filter || searchParams);
  const totalPages = useRef(0);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const headerTitles = Object.keys(headers);
  const rowDataKeys = Object.values(headers);

  const [rows, setRows] = useState([]);
  const normalizedRows = Array.isArray(rows) ? rows : [rows];
  const [sortedBy, setSortedBy] = useState<string>("name");

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

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

  const constructRequest = useCallback(() => {
    const request = {
      page,
      size: pageSize,
      sort: sortedBy,
    };

    if (Object.keys(filters.current).length > 0) {
      for (const key in filters.current) {
        request[key] = filters.current[key];
      }
    }

    return request;
  }, [page, pageSize, sortedBy, filters]);

  const fetchData = useCallback(() => {
    const request = constructRequest();

    paginateFunction(request).then((data) => {
      totalPages.current = data?.totalPages;
      if (totalPages.current < page) {
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
  }, [constructRequest, page, paginateFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /**
   *
   */
  async function onDelete() {
    if (window.confirm("Are you sure you want to delete these rows?")) {
      try {
        for (const row of selectedRows) {
          await deleteFunction(row.id);
        }
        fetchData();
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
      }
    }
  }

  return (
    <>
      <ContainerBox>
        <div className="flex bg-neutral text-neutral-content flex-row justify-between items-center w-full p-4">
          <h1 className="text-3xl font-semibold">List of {tableName}</h1>
          {!readOnly && (
            <div>
              <button
                onClick={onAddButtonClick}
                className="btn btn-xs btn-ghost"
                aria-label={`Add ${tableName}`}
              >
                <Add aria-label={`Add ${tableName}`} />
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete();
                }}
                disabled={!selectedRows.length}
                className="btn btn-ghost btn-xs"
                aria-label="Delete"
              >
                <Trash />
              </button>
            </div>
          )}
        </div>
        <table className="table text-center">
          <thead>
            <tr>
              {!readOnly && deleteFunction && (
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
            normalizedRows.map((row) => (
              <tbody key={row.id}>
                <tr onClick={() => onRowClick(row)}>
                  {!readOnly && deleteFunction && (
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
                      key={key}
                      onClick={
                        clickableColumns[key]
                          ? () => clickableColumns[key](row)
                          : undefined
                      }
                      className={
                        clickableColumns[key]
                          ? "btn btn-ghost text-neutral-content btn-xs"
                          : ""
                      }
                    >
                      {row[key]}
                    </td>
                  ))}
                  <td>
                    {!buttonName && !onRowButtonClick ? null : (
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          onRowButtonClick(row);
                        }}
                        className="btn btn-ghost text-neutral-content btn-xs"
                      >
                        {buttonName}
                      </button>
                    )}
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
            aria-label="Select page size"
            onChange={(e) => setPageSize(parseInt(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
          </select>
        </div>
      </ContainerBox>
      {error && (
        <ErrorModal
          message={error}
          closeModal={() => setError(null)}
        ></ErrorModal>
      )}
    </>
  );
}
