/** @format */

import React from "react";
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
  page,
  setPage,
  totalElements,
  pageSize,
}) {
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
            disabled={page * pageSize >= totalElements}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}

export default DynamicTable;
