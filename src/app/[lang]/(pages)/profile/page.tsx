import { getUser } from "@/lib/auth";

import Profile from "./Profiles";

export default async function Page({
  params,
}: Readonly<{
  params: { id: string };
  children: React.ReactNode;
  admin: React.ReactNode;
  coordinator: React.ReactNode;
  employee: React.ReactNode;
  student: React.ReactNode;
}>) {
  const user = await getUser();
  return <Profile user={user} />;
}
