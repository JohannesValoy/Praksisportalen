import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth";
import { Section } from "@/app/_models/Section";
import { getSectionObjectByID } from "@/services/SectionService";
import SectionPage from "./section";

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  let section: Section = null;
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
