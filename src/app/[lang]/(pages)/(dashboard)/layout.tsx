import { Role } from "@/app/api/auth/[...nextauth]/nextauth";
import { checkUserRole } from "@/lib/auth";

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
