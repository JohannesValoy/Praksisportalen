import {
  fetchCoordinatorsEmail,
  fetchEmployeesEmail,
  fetchStudentsEmail,
} from "./action";
import AddUserPage from "./addUser";

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
