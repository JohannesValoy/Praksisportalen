import { getUser } from "@/lib/auth";
import ListOfDepartments from "./departments";

/**
 * The Page component fetches the user object and renders the ListOfDepartments component.
 */
export default async function Page() {
  return <ListOfDepartments user={await getUser()} />;
}
