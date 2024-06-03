import { getUser } from "@/lib/auth";
import { fetchUserDetails } from "../../profile/[id]/action";
import EmployeePage from "../../profile/_employee/employee";
/**
 * The employee layout component contains a list of departments
 * @returns A react component with the list of departments
 */
export default async function EmployeeLayout() {
  const user = await getUser();
  return <EmployeePage user={await fetchUserDetails(user.id)} />;
}
