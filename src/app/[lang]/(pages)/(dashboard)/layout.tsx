import { checkUserRole } from "@/lib/auth";
import { Role } from "@/app/api/auth/[...nextauth]/nextauth";
/**
 * Decides the layout based on the user's role.
 * @param root The root element.
 * @param root.children The page.tsx within the URL.
 * @param root.admin The layout for the admin.
 * @param root.coordinator The layout for the coordinator.
 * @param root.employee The layout for the employee.
 * @param root.student The layout for the student.
 * @returns The layout based on the user's role.
 */
export default async function Layout({
  children,
  admin,
  coordinator,
  employee,
  student,
}: Readonly<{
  children: React.ReactNode;
  admin: React.ReactNode;
  coordinator: React.ReactNode;
  employee: React.ReactNode;
  student: React.ReactNode;
}>) {
  const role = await checkUserRole();
  let layout = null;
  if (role === Role.admin) {
    layout = admin;
  } else if (role === Role.coordinator) {
    layout = coordinator;
  } else if (role === Role.employee) {
    layout = employee;
  } else if (role === Role.student) {
    layout = student;
  }
  return <>{layout}</>;
}
