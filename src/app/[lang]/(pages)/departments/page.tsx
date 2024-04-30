import { getUser } from "@/lib/auth";
import ListOfDepartments from "./departments";

export default async function Page() {
  return <ListOfDepartments user={await getUser()} />;
}
