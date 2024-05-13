import { getUser } from "@/lib/auth";
import AddStudentPage from "./addStudent";
import { fetchEducationInstitutions } from "../../../studyprograms/actions";
import { fetchUserDetails } from "../../../profile/[id]/action";
import { getCoordinatorsByID } from "@/services/CoordinatorService";
import { Role } from "@/app/api/auth/[...nextauth]/nextauth";

/**
 * The Page function returns the AddStudentPage component.
 * @returns The AddStudentPage component.
 */
export default async function Page() {
  let user = await fetchUserDetails((await getUser()).id);
  if (user.role === Role.coordinator) {
    user = { ...(await getCoordinatorsByID(user.id)), role: Role.coordinator };
  }
  const educationInstitutions = await fetchEducationInstitutions();

  return (
    <AddStudentPage
      wordbook={null}
      user={user}
      educationInstitutions={educationInstitutions}
    />
  );
}
