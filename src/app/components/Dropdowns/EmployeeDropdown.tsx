import React from "react";
import Dropdown from "./Dropdown";

interface EmployeeDropdownProps {
  employees: any[];
  employeeID: string;
  setEmployeeID: (id: string) => void;
  dropdownName?: string;
  customSubClassName?: string;
}

/**
 * The EmployeeDropdown component is a reusable dropdown component for employees.
 * @param employees The employees to display in the dropdown.
 * @param employees.employees The employees to display in the dropdown.
 * @param employees.employeeID Id of the employee.
 * @param employees.setEmployeeID Function to set the employee ID.
 * @param employees.dropdownName Name of the dropdown.
 * @param employees.customSubClassName custom name for subclasses.
 * @returns An employee dropdown component.
 */
const EmployeeDropdown: React.FC<EmployeeDropdownProps> = ({
  employees,
  employeeID,
  setEmployeeID,
  dropdownName = "Leader",
  customSubClassName = "h-20",
}) => {
  return (
    <Dropdown
      dropdownName={dropdownName}
      options={employees}
      selectedOption={employees.find((user) => user.id === employeeID) || null}
      setSelectedOption={(user) => setEmployeeID(user.id as string)}
      onSearchChange={() => setEmployeeID(null)}
      customSubClassName={customSubClassName}
      renderOption={(user) => (
        <>
          <div>{user.name}</div>
          <div>{user.email}</div>
        </>
      )}
    />
  );
};

export default EmployeeDropdown;
