/** @format */

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
  selectedOption: Option | null;
  setSelectedOption: (option: Option) => void;
  renderOption: (option: Option) => JSX.Element;
  customClassName?: string;
  required?: boolean;
  onSearchChange?: (searchTerm: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  renderOption,
  dropdownName,
  customClassName,
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
        className={"input input-bordered w-full " + customClassName}
        aria-label={dropdownName}
      />
      {isDropdownOpen && (
        <ul className="dropdown-content z-[1] menu block shadow bg-base-300 text-base-content rounded-box w-full scrollbar-thin overflow-y-auto max-h-60">
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
