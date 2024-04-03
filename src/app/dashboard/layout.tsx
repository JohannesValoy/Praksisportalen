import { checkUserRole } from "@/lib/auth";
import AdminLayout from "./@admin/page";
import CoordinatorLayout from "./@coordinator/page";
import EmployeeLayout from "./@employee/page";
import StudentLayout from "./@student/page";

export default async function App() {
  const role = await checkUserRole();

  if (role === "admin") {
    return <AdminLayout />;
  } else if (role === "coordinator") {
    return <CoordinatorLayout />;
  } else if (role === "employee") {
    return <EmployeeLayout />;
  } else if (role === "student") {
    return <StudentLayout />;
  } else {
    return null; // or some kind of default layout or loading state
  }
}
