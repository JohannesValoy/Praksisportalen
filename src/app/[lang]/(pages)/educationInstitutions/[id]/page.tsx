import { getUser } from "@/lib/auth";
import InstitutionPage from "./educationInstitution";
import { EducationInstitution } from "@/app/_models/EducationInstitution";
import { getEducationInstitutionByID } from "@/services/EducationInstituteService";
import { notFound } from "next/navigation";

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
  return <InstitutionPage eduInstitution={eduInstitution} />;
}
