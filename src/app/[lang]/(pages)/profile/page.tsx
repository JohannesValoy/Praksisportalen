import { getUser } from "@/lib/auth";

import Profile from "./Profiles";

export default async function Page() {
  const user = await getUser();
  return <Profile user={user} />;
}
