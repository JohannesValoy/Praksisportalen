import { notFound } from "next/navigation";
import { fetchUserDetails } from "../action";
import Profile from "../Profiles";

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const user = await fetchUserDetails(params.id);
  if (!user) {
    notFound();
  }
  return <Profile user={user} />;
}
