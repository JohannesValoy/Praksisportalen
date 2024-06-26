"use server";
import { Role } from "@/app/api/auth/[...nextauth]/nextauth";
import ListOfStudents from "./students";
import { getUser } from "@/lib/auth";
import { getCoordinatorsByID } from "@/services/CoordinatorService";
import { fetchEducationInstitutions } from "../../studyprograms/actions";

/**
 * The Page component fetches the user object and renders the ListOfStudents component.
 * @returns The ListOfStudents component.
 */
export default async function Page() {
  const user = await getUser();
  let educationInstitutionID = null;

  /**
   * If the user is a coordinator, fetch the coordinator object.
   * Set the educationInstitutionID to the coordinator's educationInstitutionID.
   */
  if (user.role === Role.coordinator) {
    const coordinator = await getCoordinatorsByID(user.id);
    educationInstitutionID = coordinator.educationInstitution.id;
  }

  const educationInstitutions = await fetchEducationInstitutions();

  return (
    <ListOfStudents
      educationInstitutions={educationInstitutions}
      wordbook={null}
      user={user}
      educationInstitutionID={educationInstitutionID}
    />
  );
}
