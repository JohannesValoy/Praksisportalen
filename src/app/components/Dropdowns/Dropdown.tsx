"use client";
import { useState } from "react";

interface Option {
  id?: string | number;
  name: string;
  email?: string;
  image?: string;
}

interface DropdownProps {
  dropdownName?: string;
  options: Option[];
  selectedOption: Option;
  setSelectedOption: (option: Option) => void;
  renderOption: (option: Option) => JSX.Element;
  customClassName?: string;
  customSubClassName?: string;
  required?: boolean;
  onSearchChange?: (searchTerm: string) => void;
}

/**
 * The Dropdown component is a reusable dropdown component.
 * @param options The options to display in the dropdown.
 * @param options.options The options to display in the dropdown.
 * @param options.selectedOption The selected option.
 * @param options.setSelectedOption The function to set the selected option.
 * @param options.renderOption The function to render the option.
 * @param options.dropdownName The name of the dropdown.
 * @param options.customClassName The custom class name.
 * @param options.customSubClassName The custom sub class name.
 * @param options.onSearchChange The function to handle the search change.
 * @returns A dropdown component.
 */
const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  renderOption,
  dropdownName,
  customClassName,
  customSubClassName,
  onSearchChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredOptions = Array.isArray(options)
    ? options.filter((option) =>
        option.name.toLowerCase().includes((searchTerm || "").toLowerCase())
      )
    : [];

  return (
    <div className="dropdown dropdown-end w-full ">
      <input
        type="text"
        placeholder={dropdownName}
        value={selectedOption ? selectedOption.name : searchTerm || ""}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (onSearchChange) {
            onSearchChange(e.target.value);
          }
        }}
        onClick={() => setIsDropdownOpen(true)}
        className={
          "input input-bordered text-base-content w-full " + customClassName
        }
        aria-label={dropdownName}
      />
      {isDropdownOpen && (
        <ul
          className={
            customSubClassName +
            " dropdown-content z-[1] menu block shadow bg-base-300 text-base-content rounded-box w-full scrollbar-thin overflow-y-auto max-h-60 "
          }
        >
          {filteredOptions.map((option) => (
            <li key={option.id || option.name}>
              <button
                onClick={() => {
                  setSelectedOption(option);
                  setSearchTerm("");
                  setIsDropdownOpen(false);
                }}
                className="btn btn-ghost w-full flex justify-start"
              >
                {renderOption(option)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
