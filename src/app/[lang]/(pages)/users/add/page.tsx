import {
  fetchCoordinatorsEmail,
  fetchEmployeesEmail,
  fetchStudentsEmail,
} from "./action";
import AddUserPage from "./addUser";

/**
 * The Page function returns the AddUserPage component.
 * @returns The AddUserPage component.
 */
export default async function Page() {
  return (
    <AddUserPage
      wordbook={null}
      employees={fetchEmployeesEmail}
      coordinators={fetchCoordinatorsEmail}
      students={fetchStudentsEmail}
    />
  );
}
