"use server";
import { Role } from "@/app/api/auth/[...nextauth]/nextauth";
import ListOfStudents from "./students";
import { getUser } from "@/lib/auth";
import { getCoordinatorsByID } from "@/services/CoordinatorService";

export default async function Page() {
  const user = await getUser();
  let educationInstitutionID = null;
  if (user.role === Role.coordinator) {
    await getCoordinatorsByID(user.id);
  }
  return (
    <ListOfStudents
      wordbook={null}
      user={await getUser()}
      educationInstitutionID={educationInstitutionID}
    />
  );
}
