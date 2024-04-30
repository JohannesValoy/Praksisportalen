import { getUser } from "@/lib/auth";
import ProfilePage from "./profile";

export default async function Page() {
  return <ProfilePage user={await getUser()} />;
}
