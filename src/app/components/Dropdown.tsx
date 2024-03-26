import { useState } from "react";

interface Option {
  id: string;
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
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  renderOption,
  dropdownName,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="dropdown dropdown-end w-full">
      <div tabIndex={0} role="button" className="btn w-full h-full">
        {selectedOption ? renderOption(selectedOption) : dropdownName}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-full"
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full"
        />
        {filteredOptions.map((option, index) => (
          <tbody key={index} className="p-1">
            <tr
              onClick={() => setSelectedOption(option)}
              className="btn w-full flex flex-row justify-start items-center p-2 h-fit"
            >
              {renderOption(option)}
            </tr>
          </tbody>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
