import EmployeePage from "./_employee/employee";
import StudentPage from "./_student/student";
import AdminPage from "./_admin/admin";
import CoordinatorPage from "./_coordinator/coordinator";
import { Role } from "@/app/api/auth/[...nextauth]/nextauth";
import { getCoordinatorsByID } from "@/services/CoordinatorService";

export default async function Profile({ user }: Readonly<{ user }>) {
  let page = null;

  if (user.role === Role.employee) {
    page = <EmployeePage user={user} />;
  }
  if (user.role === Role.student) {
    page = <StudentPage user={user} />;
  }
  if (user.role === Role.admin) {
    page = <AdminPage user={user} />;
  }
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
    <div className="flex flex-col items-center">
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      {page}
    </div>
  );
}
