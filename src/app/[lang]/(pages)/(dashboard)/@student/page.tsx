import { getUser } from "@/lib/auth";
import Profile from "../../profile/Profiles";

export default async function StudentLayout() {
  return <Profile user={await getUser()} />;
}
