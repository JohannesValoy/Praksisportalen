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
 * @param root The root object.
 * @param root.dropdownName The name of the dropdown.
 * @param root.options The options to display in the dropdown.
 * @param root.selectedOption The selected option.
 * @param root.setSelectedOption The function to set the selected option.
 * @param root.renderOption The function to render the option.
 * @param root.customClassName The custom class name.
 * @param root.customSubClassName The custom sub class name.
 * @param root.onSearchChange The function to handle the search change.
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

  /**
   * Incase the options are nested, flatten them. Otherwise, return the options.
   */
  const flattenedOptions = Array.isArray(options) ? options.flat() : [];

  const filteredOptions = flattenedOptions.filter((option) =>
    option.name
      ? option.name.toLowerCase().includes((searchTerm || "").toLowerCase())
      : false,
  );

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
