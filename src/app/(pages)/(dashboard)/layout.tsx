import { checkUserRole } from "@/lib/auth";

export default async function Layout({
  children,
  admin,
  coordinator,
  employee,
  student
} : Readonly<{
  children: React.ReactNode,
  admin: React.ReactNode,
  coordinator: React.ReactNode,
  employee: React.ReactNode,
  student: React.ReactNode
}>) {
  const role = await checkUserRole();
  let layout = null;
  if (role === "admin") {
    layout = admin
  } else if (role === "coordinator") {
    layout = coordinator;
  } else if (role === "employee") {
    layout =  employee;
  } else if (role === "student") {
    layout = student;
  }
  return (<>{layout}</>);
}
