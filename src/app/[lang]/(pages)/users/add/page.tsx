import { fetchEducationInstitutions } from "../../studyprograms/actions";
import AddUserPage from "./addUser";

/**
 * The Page function returns the AddUserPage component.
 * @returns The AddUserPage component.
 */
export default async function Page() {
  const educationInstitutions = await fetchEducationInstitutions();
  return (
    <AddUserPage
      wordbook={null}
      educationInstitutions={educationInstitutions}
    />
  );
}
