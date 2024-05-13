import React from "react";
import Dropdown from "./Dropdown";

interface EduInstitutionDropdownProps {
  educationInstitutions: any[];
  educationInstitutionID: number;
  setEducationInstitutionID: (id: number) => void;
  dropdownName?: string;
  customSubClassName?: string;
}

/**
 * The EmployeeDropdown component is a reusable dropdown component for employees.
 * @param root The root object.
 * @param root.educationInstitutions The education institutions array.
 * @param root.educationInstitutionID The education institution ID.
 * @param root.setEducationInstitutionID The function to set the education institution ID.
 * @param root.dropdownName The dropdown name.
 * @param root.customSubClassName The custom sub class name.
 * @returns An employee dropdown component.
 */
const EduInstitutionDropdown: React.FC<EduInstitutionDropdownProps> = ({
  educationInstitutions,
  educationInstitutionID,
  setEducationInstitutionID,
  dropdownName = "Education Institution",
  customSubClassName = "h-fit",
}) => {
  return (
    <Dropdown
      dropdownName={dropdownName}
      options={educationInstitutions}
      selectedOption={
        educationInstitutions.find(
          (edu) => edu.id === educationInstitutionID,
        ) || null
      }
      setSelectedOption={(edu) => setEducationInstitutionID(edu.id as number)}
      onSearchChange={() => setEducationInstitutionID(null)}
      customSubClassName={customSubClassName}
      renderOption={(edu) => <>{edu.name}</>}
    />
  );
};

export default EduInstitutionDropdown;
