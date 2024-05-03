import { getUser } from "@/lib/auth";
import Profile from "../../profile/Profiles";

/**
 * The Page component fetches the user object and renders the Profile component.
 */
export default async function StudentLayout() {
  return <Profile user={await getUser()} />;
}
