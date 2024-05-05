import { notFound } from "next/navigation";
import { fetchUserDetails } from "./action";
import Profile from "../Profiles";

/**
 * The Page component fetches a user object by ID and renders the Profile component.
 * @param root The root object.
 * @param root.params The parameters of the page.
 * @returns The Profile component.
 */
export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const user = await fetchUserDetails(params.id);

  /**
   * If the user object is not found, the notFound function is called.
   * This function will render the 404 page.
   */
  if (!user) {
    notFound();
  }

  return <Profile user={user} />;
}
