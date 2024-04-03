/** @format */

import React from "react";

function DynamicTable({
  rows,
  setRows,
  tableName,
  headers,
  selectedRows,
  setSelectedRows,
  onRowClick,
  onRowButtonClick,
  buttonName,
  onAddButtonClick,
  clickableColumns = {},
  sortableBy,
  setSortedBy,
  url,
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
          rows.filter(
            (currRow) => !selectedRows.find((row) => row.id === currRow.id)
          )
        );
      }
    });
  };
  console.log(rows);
  return (
    <div className="flex flex-col justify-center mt-4 overflow-x-auto p-4">
      <div>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-semibold">List of {tableName}</h1>
          <div>
            <button
              onClick={() => {
                setSelectedRows([]);
              }}
              className="btn btn-xs btn-ghost"
            >
              Clear Selection
            </button>
            <button onClick={onAddButtonClick} className="btn btn-xs btn-ghost">
              Add {tableName}
            </button>

            <button
              onClick={(event) => {
                event.stopPropagation(); // Prevent row click when button is clicked
                onDeleteButtonClicked();
              }}
              className="btn btn-ghost btn-xs"
            >
              Delete
            </button>
          </div>
        </div>
        <table className="table my-4">
          <thead>
            <tr>
              <th></th>
              {headerTitles.map((title, index) => (
                <th key={index}>
                  <div
                    onClick={() => setSortedBy(title.toLowerCase())}
                    className="btn btn-ghost btn-xs"
                  >
                    {title}
                  </div>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          {!rows ||
          (Array.isArray(rows) && rows.length === 0) ||
          rows?.message != null ? (
            <tbody>
              <tr>
                <td>{Array.isArray(rows) ? "Loading" : rows.message}</td>
              </tr>
            </tbody>
          ) : (
            (Array.isArray(rows) ? rows : rows.elements).map((row, index) => (
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
      </div>
    </div>
  );
}

export default DynamicTable;
