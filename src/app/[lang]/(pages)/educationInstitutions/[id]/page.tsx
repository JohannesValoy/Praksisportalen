import InstitutionPage from "./eduInstitution";
import { EducationInstitution } from "@/app/_models/EducationInstitution";
import { getEducationInstitutionByID } from "@/services/EducationInstituteService";
import { notFound } from "next/navigation";

/**
 * The Page component fetches an education institution object by ID and renders the InstitutionPage component.
 * @param params The parameters of the page.
 */
export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  let eduInstitution: EducationInstitution = null;

  try {
    eduInstitution = await getEducationInstitutionByID(Number(params.id));
  } catch (error) {
    console.error("Failed to fetch Department", error);
    notFound();
  }

  return <InstitutionPage eduInstitution={eduInstitution} wordbook={null} />;
}
