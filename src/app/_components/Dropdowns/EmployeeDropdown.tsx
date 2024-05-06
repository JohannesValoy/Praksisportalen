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
 * @param root The root object.
 * @param root.employees The employees array.
 * @param root.employeeID The employee ID.
 * @param root.setEmployeeID The function to set the employee ID.
 * @param root.dropdownName The dropdown name.
 * @param root.customSubClassName The custom sub class name.
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
