import { getUser } from "@/lib/auth";
import AddStudentPage from "./addStudent";
import { fetchEducationInstitutions } from "../../../studyprograms/actions";

/**
 * The Page function returns the AddStudentPage component.
 * @returns The AddStudentPage component.
 */
export default async function Page() {
  const user = await getUser();
  const educationInstitutions = await fetchEducationInstitutions();
  return (
    <AddStudentPage
      wordbook={null}
      user={user}
      educationInstitutions={educationInstitutions}
    />
  );
}
