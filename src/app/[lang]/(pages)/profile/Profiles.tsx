import EmployeePage from "./_employee/employee";
import StudentPage from "./_student/student";
import AdminPage from "./_admin/admin";
import CoordinatorPage from "./_coordinator/coordinator";
import { Role } from "@/app/api/auth/[...nextauth]/nextauth";
import { getCoordinatorsByID } from "@/services/CoordinatorService";
import EditUser from "@/app/_components/Modals/EditUserModal";
import { fetchUserDetails } from "./[id]/action";
import { getUser } from "@/lib/auth";

/**
 * The Profile component renders a page based on the user's role.
 * @param root The root object.
 * @param root.user The user object.
 * @returns The Profile component.
 */
export default async function Profile({ user }: Readonly<{ user }>) {
  let page = null;
  const isAdmin = await fetchUserDetails((await getUser()).id);

  if (user.role === Role.employee) {
    page = <EmployeePage user={user} />;
  }
  if (user.role === Role.student) {
    page = <StudentPage user={user} />;
  }
  if (user.role === Role.admin) {
    page = <AdminPage user={user} />;
  }
  /**
   * If the user is a coordinator, the page will be rendered with the CoordinatorPage component.
   * The educationInstitutionID is fetched from the coordinator object.
   */
  if (user.role === Role.coordinator) {
    let educationInstitutionID = null;
    const coordinator = await getCoordinatorsByID(user.id);
    educationInstitutionID = coordinator.educationInstitution.id;
    page = (
      <CoordinatorPage
        user={user}
        educationInstitutionID={educationInstitutionID}
      />
    );
  }
  return (
    <div className="flex flex-col w-full gap-2 items-center">
      <div className="flex flex-row items-start">
        <h1>{user.name}</h1>
        {isAdmin.role === Role.admin && <EditUser user={user} />}
      </div>
      <p>Email: {user.email}</p>
      {page}
    </div>
  );
}
