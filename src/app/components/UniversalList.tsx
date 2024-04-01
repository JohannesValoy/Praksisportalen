/** @format */

import React from "react";

function DynamicTable({
  rows,
  tableName,
  headers,
  selectedRows,
  setSelectedRows,
  onRowClick,
  onRowButtonClick,
  buttonName,
  onAddButtonClick,
  clickableColumns = {},
}) {
  const toggleSelection = (row, event) => {
    event.stopPropagation(); // Prevent the row click event from firing when toggling selection
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

  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <h1 className="text-3xl font-semibold">List of {tableName}</h1>
      <table className="table my-4">
        <thead>
          <tr>
            <th></th>
            {headerTitles.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
            <th>
              <button onClick={onAddButtonClick} className="btn btn-xs">
                Add {tableName}
              </button>
            </th>
          </tr>
        </thead>
        {rows.map((row, index) => (
          <tbody key={index}>
            <tr onClick={() => onRowClick(row)}>
              <th onClick={(e) => e.stopPropagation()}>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    onClick={(e) => toggleSelection(row, e)}
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
                    event.stopPropagation(); // Prevent row click when button is clicked
                    onRowButtonClick(row);
                  }}
                  className="btn btn-ghost btn-xs"
                >
                  {buttonName}
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default DynamicTable;
