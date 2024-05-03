import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth";
import { Section } from "@/app/_models/Section";
import { getSectionObjectByID } from "@/services/SectionService";
import SectionPage from "./section";

/**
 * The Page component fetches a section object by ID and renders the SectionPage component.
 * @param params The parameters of the page.
 */
export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  let section: Section = null;

  /**
   * Fetches the section object by ID.
   * If the section object is not found, the notFound function is called.
   * This function will render the 404 page.
   */
  try {
    section = await getSectionObjectByID(Number(params.id));
  } catch (error) {
    console.error("Failed to fetch Department", error);
    notFound();
  }

  return (
    <SectionPage section={section} wordbook={null} user={await getUser()} />
  );
}
