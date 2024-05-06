import { getUser } from "@/lib/auth";

import Profile from "./Profiles";
import { fetchUserDetails } from "./[id]/action";

/**
 * The Page component fetches the user object and renders the Profile component.
 * @returns The Profile component.
 */
export default async function Page() {
  const user = await getUser();
  return <Profile user={await fetchUserDetails(user.id)} />;
}
